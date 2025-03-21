const Project = require('../models/project');

const mongoose = require('mongoose');

exports.createProject = async (req, res) => {
	try {
		console.log('Données reçues :', req.body);
		console.log('Images traitées :', req.processedImages);

		const {
			nom,
			description,
			categorie,
			lien_github,
			lien_demo,
			technologies,
			problematics,
		} = req.body;

		if (!nom || !description || !categorie || !technologies) {
			return res
				.status(400)
				.json({ message: 'Tous les champs requis doivent être remplis' });
		}

		// Vérification et conversion des technologies en ObjectId
		let formattedTechnologies = [];
		let formattedProblematics=[]
		try {
			const parsedProblematics =
			typeof problematics === 'string'
				? JSON.parse(problematics)
				: problematics;
				formattedProblematics=parsedProblematics

			const parsedTechnologies =
				typeof technologies === 'string'
					? JSON.parse(technologies)
					: technologies;
			formattedTechnologies = parsedTechnologies.map(
				(tech) => new mongoose.Types.ObjectId(tech),
			);
		} catch (error) {
			return res
				.status(400)
				.json({ message: 'Format incorrect des technologies.' });
		}

		const newProject = new Project({
			nom,
			description,
			categorie,
			lien_github,
			lien_demo,
			problematics:formattedProblematics,
			image: req.processedImages.image || null,
			images_detail: req.processedImages.images_detail || [],
			technologies: formattedTechnologies,
		});

		await newProject.save();
		res
			.status(201)
			.json({ message: 'Projet ajouté avec succès', project: newProject });
	} catch (error) {
		console.error('Erreur serveur :', error);
		res.status(500).json({ message: 'Erreur serveur', error: error.message });
	}
};

exports.getProjects = (req, res, next) => {
	Project.find()
		.then((projects) => res.status(200).json(projects))
		.catch((error) => res.status(500).json({ error: 'Erreur serveur' }));
};

exports.getOneProject = (req, res, next) => {
	console.log('find One');
	Project.findOne({ _id: req.params.id }).populate('technologies')
		.then((project) => {
			if (!project) {
				return res.status(400).json({ error: 'requête invalide' });
			}
			res.status(200).json(project);
		})
		.catch((error) => res.status(500).json({ error: 'erreur serveur' }));
};
