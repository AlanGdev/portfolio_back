const Project = require('../models/project');

exports.createProject = (req, res, next) => {
	console.log('createProject');
	try {
		const {
			nom,
			description,
			categorie,
			lien_github,
			lien_demo,
			technologies,
			image,
		} = req.body;
		if (!nom || !description || !categorie || !technologies) {
			return res
				.status(400)
				.json({ message: 'Tous les champs requis doivent être remplis' });
		}
		const newProject = new Project({
			nom,
			description,
			categorie,
			lien_github,
			lien_demo,
			technologies,
			image,
		});
		newProject
			.save()
			.then(() =>
				res
					.status(201)
					.json({ message: 'Projet ajouté avec succès', project: newProject }),
			)
			.catch((error) => res.status(500).json({ error: 'erreur serveur' }));
	} catch (error) {
		res.status(500).json({ message: 'Erreur serveur', error: error.message });
	}
};
