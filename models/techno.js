const mongoose = require('mongoose');

const technologySchema = new mongoose.Schema({
	nom: { type: String, required: true, unique: true },
	image: { type: String, required: true }, // URL de l'image
	domaine: {
		type: String,
		enum: ['Front-End', 'Back-End', 'Full-Stack'],
		required: true,
	},
	date_creation: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Technology', technologySchema);
