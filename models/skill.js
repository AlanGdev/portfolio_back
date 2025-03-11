const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
	categorie: {
		type: String,
		required: true,
	},
	skills: [
		{
			type: String,
			required: true,
		},
	],
	projets: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Projet',
		},
	],
	dateAjout: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Skill', skillSchema);
