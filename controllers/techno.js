const Technology = require('../models/techno');

exports.createTechno = async (req, res) => {
	try {
		console.log('📥 Données reçues :', req.body);
		console.log('🖼️ Image traitée :', req.processedImages);

		const { nom, domaine } = req.body;
		if (!nom || !domaine || !req.processedImages.image) {
			return res
				.status(400)
				.json({ message: 'Tous les champs sont obligatoires.' });
		}

		// Vérifier si la technologie existe déjà
		const existingTech = await Technology.findOne({ nom });
		if (existingTech) {
			return res
				.status(400)
				.json({ message: 'Cette technologie existe déjà.' });
		}

		// Création de la technologie
		const newTechnology = new Technology({
			nom,
			image: req.processedImages.image, // URL de l’image traitée
			domaine,
		});

		await newTechnology.save();
		res.status(201).json({
			message: 'Technologie ajoutée avec succès',
			technology: newTechnology,
		});
	} catch (error) {
		console.error('Erreur serveur :', error);
		res.status(500).json({ message: 'Erreur serveur', error: error.message });
	}
};

exports.getTechnos = (req, res, next) => {
	Technology.find()
		.then((technos) => res.status(200).json(technos))
		.catch((error) => res.status(500).json({ error: 'erreur serveur' }));
};
