const mongoose = require('mongoose');
const skillSchema = mongoose.Schema({
	nom: { type: String, required: true },
	categorie: {
		type: String,
		enum: ['Front-End', 'Back-End', 'Outils & Workflow'],
		required: true,
	},
	niveau: {
		type: String,
		enum: ['Débutant', 'Intermédiaire', 'Avancé'],
		required: true,
	},
	description: { type: String, required: true },
	technologies: [{ type: String }], // Liste des technos utilisées
	projets_associes: [
		{
			nom: { type: String, required: true },
			lien_github: { type: String, required: true },
		},
	],
});

module.exports = mongoose.model('Skill', skillSchema);
