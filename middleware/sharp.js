const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const imageFolderPath = path.join(__dirname, '../images');
if (!fs.existsSync(imageFolderPath)) {
	fs.mkdirSync(imageFolderPath, { recursive: true });
}

const BASE_URL = 'http://localhost:4000';

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
			const imageBuffer = req.file.buffer;
			const imageFileName = `image-${Date.now()}.webp`;
			const imageFullPath = path.join(imageFolderPath, imageFileName);

			await sharp(imageBuffer)
				.resize(800)
				.toFormat('webp')
				.webp({ quality: 80 })
				.toFile(imageFullPath);

			req.processedImages.image = `${BASE_URL}/images/${imageFileName}`;
		}

		// Traitement de l'image principale pour un projet
		if (req.files && req.files['image']) {
			console.log("Traitement de l'image principale d'un projet...");
			const imageBuffer = req.files['image'][0].buffer;
			const imageFileName = `image-${Date.now()}.webp`;
			const imageFullPath = path.join(imageFolderPath, imageFileName);

			await sharp(imageBuffer)
				.resize(800)
				.toFormat('webp')
				.webp({ quality: 80 })
				.toFile(imageFullPath);

			req.processedImages.image = `${BASE_URL}/images/${imageFileName}`;
		}

		// Traitement des images de détail pour un projet
		if (req.files && req.files['images_detail']) {
			console.log('Traitement des images de détail...');
			req.processedImages.images_detail = [];
			for (const file of req.files['images_detail']) {
				const detailFileName = `detail-${Date.now()}-${Math.round(
					Math.random() * 1e9,
				)}.webp`;
				const detailFullPath = path.join(imageFolderPath, detailFileName);

				await sharp(file.buffer)
					.resize(600)
					.toFormat('webp')
					.webp({ quality: 80 })
					.toFile(detailFullPath);

				req.processedImages.images_detail.push(
					`${BASE_URL}/images/${detailFileName}`,
				);
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
