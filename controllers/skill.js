const Skill = require('../models/skill');

exports.createSkill = (req, res, next) => {
	console.log('createskill');
	try {
		const {
			nom,
			categorie,
			niveau,
			description,
			technologies,
			projets_associes,
		} = req.body;
		if (
			!nom ||
			!categorie ||
			!niveau ||
			!description ||
			!technologies ||
			!projets_associes
		) {
			return res.status(400).json({ message: 'Tous les champs sont requis' });
		}
		const newSkill = new Skill({
			nom,
			categorie,
			niveau,
			description,
			technologies,
			projets_associes,
		});
		newSkill
			.save()
			.then(() =>
				res
					.status(201)
					.json({ message: 'Compétence ajoutée avec succès', skill: newSkill }),
			)
			.catch((error) => res.status(500).json({ error: 'erreur serveur' }));
	} catch (error) {
		res.status(500).json({ message: 'erreur serveur', error: error.message });
	}
};
