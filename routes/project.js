const express = require('express');
const projectCtrl = require('../controllers/project');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');
const processImages = require('../middleware/sharp');

const router = express.Router();

router.post(
	'/',
	auth,
	upload.fields([
		{ name: 'image', maxCount: 1 },
		{ name: 'images_detail', maxCount: 5 },
	]),
	processImages,
	projectCtrl.createProject,
);

router.get('/', projectCtrl.getProjects);
router.get('/:id', projectCtrl.getOneProject);

module.exports = router;
