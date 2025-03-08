const Contact = require('../models/contact');

exports.createMessage = (req, res, next) => {
	console.log('createMessage');
	try {
		const { nom, email, message } = req.body;
		if (!nom || !email || !message) {
			return res.status(400).json({ message: 'Tous les champs sont requis' });
		}
		const newContact = new Contact({
			nom,
			email,
			message,
		});
		newContact
			.save()
			.then(() =>
				res
					.status(201)
					.json({ message: 'Message ajouté avec succès', contact: newContact }),
			)
			.catch((error) => res.status(500).json({ error: 'erreur serveur' }));
	} catch (error) {
		res.status(500).json({ message: 'erreur serveur', error: error.message });
	}
};
