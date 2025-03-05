const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const imageFolderPath = path.join(__dirname, '../images');
if (!fs.existsSync(imageFolderPath)) {
	fs.mkdirSync(imageFolderPath, { recursive: true });
}

const BASE_URL = 'http://localhost:4000';

const processImages = async (req, res, next) => {
	try {
		if (!req.files) return next();

		req.processedImages = {};

		if (req.files['image']) {
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

		if (req.files['images_detail']) {
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
