const sharp = require('sharp');
const { v2: cloudinary } = require('cloudinary');
const streamifier = require('streamifier');
require('dotenv').config();

// Configuration automatique de Cloudinary via CLOUDINARY_URL
cloudinary.config();

const uploadToCloudinary = async (buffer, folder) => {
	return new Promise((resolve, reject) => {
	  console.log(" Upload vers Cloudinary en cours...");
	  console.log("CLOUDINARY_URL :", process.env.CLOUDINARY_URL);
  
	  const uploadStream = cloudinary.uploader.upload_stream(
		{ folder: folder, format: 'webp', quality: 'auto' },
		(error, result) => {
		  if (error) {
			console.error(" Erreur d'upload vers Cloudinary :", error);
			reject(error);
		  } else {
			console.log(" Upload réussi sur Cloudinary :", result.secure_url);
			resolve(result.secure_url);
		  }
		}
	  );
  
	  streamifier.createReadStream(buffer).pipe(uploadStream);
	});
  };

const processImages = async (req, res, next) => {
  console.log(
    'Fichiers reçus pour traitement :',
    req.file ? req.file : req.files,
  );

  try {
    req.processedImages = {};

    // Traitement de l'image principale
    if (req.file) {
      console.log("Traitement de l'image unique...");
      const imageBuffer = await sharp(req.file.buffer)
        .resize(800)
        .toFormat('webp')
        .webp({ quality: 80 })
        .toBuffer();

      const imageUrl = await uploadToCloudinary(imageBuffer, 'portfolio');
      req.processedImages.image = imageUrl;
    }

    // Traitement de l'image principale pour un projet
    if (req.files && req.files['image']) {
      console.log("Traitement de l'image principale d'un projet...");
      const imageBuffer = await sharp(req.files['image'][0].buffer)
        .resize(800)
        .toFormat('webp')
        .webp({ quality: 80 })
        .toBuffer();

      const imageUrl = await uploadToCloudinary(imageBuffer, 'portfolio-projets');
      req.processedImages.image = imageUrl;
    }

    // Traitement des images de détail pour un projet
    if (req.files && req.files['images_detail']) {
      console.log('Traitement des images de détail...');
      req.processedImages.images_detail = [];

      for (const file of req.files['images_detail']) {
        const detailBuffer = await sharp(file.buffer)
          .resize(600)
          .toFormat('webp')
          .webp({ quality: 80 })
          .toBuffer();

        const detailUrl = await uploadToCloudinary(detailBuffer, 'portfolio-details');
        req.processedImages.images_detail.push(detailUrl);
      }
    }

    console.log('Images traitées avec succès :', req.processedImages);
    next();
  } catch (error) {
    console.error('Erreur lors du traitement des images :', error);
    res.status(500).json({
      message: 'Erreur lors du traitement des images',
      error: error.message,
    });
  }
};

module.exports = processImages;