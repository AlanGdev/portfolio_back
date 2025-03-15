const express = require('express');
const skillCtrl = require('../controllers/skill');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, skillCtrl.createSkill);
router.get('/',skillCtrl.getSkills)

module.exports = router;
