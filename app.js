const express = require('express');
const mongoose = require('mongoose');
const Skill = require('./models/skill');
const userRouter = require('./routes/user');
const skillRouter = require('./routes/skill');
const projectRouter = require('./routes/project');
require('dotenv').config();

const app = express();

app.use(express.json());

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log('Connexion à MongoDB réussie'))
	.catch(() => console.log('Connexion à MongoDB échouée'));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin,X-Requested-With,Content,Accept,Content-Type,Authorization',
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET,POST,PUT,DELETE,PATCH,OPTIONS',
	);
	next();
});

/*app.use((req, res) => {
	res.json({ message: 'requête reçue côté app.js' });
});*/

app.use('/api/auth/', userRouter);
app.use('/api/skills/', skillRouter);
app.use('/api/projects/', projectRouter);

module.exports = app;
