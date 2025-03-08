const express = require('express');
const contactCtrl = require('../controllers/contact');

const router = express.Router();

router.post('/', contactCtrl.createMessage);

module.exports = router;
