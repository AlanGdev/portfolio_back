const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
	nom: {
		type: String,
		required: [true, 'Le nom est obligatoire'],
		trim: true,
		minlength: 2,
		maxlength: 100,
	},
	email: {
		type: String,
		required: [true, 'L’email est obligatoire'],
		trim: true,
		lowercase: true,
		match: [/^\S+@\S+\.\S+$/, 'Email invalide'],
	},
	message: {
		type: String,
		required: [true, 'Le message est obligatoire'],
		trim: true,
		minlength: 5,
		maxlength: 1000,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Contact', contactSchema);
