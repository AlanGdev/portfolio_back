const Skill = require('../models/skill');
const mongoose = require('mongoose');

exports.createSkill = async (req, res) => {
  try {
    console.log('Données reçues :', req.body);

    const { categorie, skills, projets } = req.body;

    // Vérifier que les champs obligatoires sont bien présents
    if (!categorie || !skills || !skills.length) {
      return res.status(400).json({ message: 'Catégorie et au moins une compétence sont requises.' });
    }

    // Vérification et conversion des projets en ObjectId
    let formattedProjets = [];
    try {
      formattedProjets = projets ? projets.map(projet => new mongoose.Types.ObjectId(projet)) : [];
    } catch (error) {
      return res.status(400).json({ message: 'Format incorrect des projets.' });
    }

    // Création du nouvel objet Skill
    const newSkill = new Skill({
      categorie,
      skills,
      projets: formattedProjets,
    });

    // Sauvegarde dans la base de données
    await newSkill.save();

    res.status(201).json({ message: 'Compétence ajoutée avec succès !', skill: newSkill });
  } catch (error) {
    console.error('Erreur serveur :', error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
exports.getSkills=(req,res)=>{
  Skill.find()
  .then((skills)=>res.status(200).json(skills))
  .catch((error)=>res.status(500).json({error:'Erreur serveur'}))
}
