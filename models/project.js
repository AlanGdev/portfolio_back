const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	nom: { type: String, required: true },
	description: { type: String, required: true },
	categorie: {
		type: String,
		enum: ['Front-End', 'Back-End', 'Full-Stack'],
		required: true,
	},
	lien_github: { type: String, required: true },
	lien_demo: { type: String }, // Optionnel : lien vers une version en ligne
	technologies: [{ type: String, required: true }], // Liste des technologies utilisées
	date_creation: { type: Date, default: Date.now }, // Date de création du projet
	//image: { type: String }, // Optionnel : URL de l'image du projet
});

module.exports = mongoose.model('Project', projectSchema);
