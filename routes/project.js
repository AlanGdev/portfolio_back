const express = require('express');
const projectCtrl = require('../controllers/project');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, projectCtrl.createProject);

module.exports = router;
