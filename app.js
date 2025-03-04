const express = require('express');

const app = express();

app.use((req, res) => {
	res.json({ message: 'requête reçue côté app.js' });
});

module.exports = app;
