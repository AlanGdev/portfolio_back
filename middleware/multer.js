const multer = require('multer');

// Configuration pour stocker les fichiers en mémoire
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
	const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
	if (allowedTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error('Seules les images JPEG, PNG et WebP sont autorisées'), false);
	}
};

const upload = multer({
	storage: storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5 Mo
	fileFilter: fileFilter,
});

module.exports = upload;
