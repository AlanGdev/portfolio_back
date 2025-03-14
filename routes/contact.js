const express = require('express');
const auth = require('../middleware/auth');

const contactCtrl = require('../controllers/contact');

const router = express.Router();

router.post('/', contactCtrl.createMessage);
router.get('/', auth, contactCtrl.getMessages);

module.exports = router;
