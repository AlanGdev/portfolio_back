const express = require('express');
const technoCtrl = require('../controllers/techno');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');
const processImages = require('../middleware/sharp');

const router = express.Router();

router.post(
	'/',
	auth,
	upload.single('image'),
	processImages,
	technoCtrl.createTechno,
);
router.get('/', technoCtrl.getTechnos);
module.exports = router;
