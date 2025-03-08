const express = require('express');
const mongoose = require('mongoose');
const Skill = require('./models/skill');
const userRouter = require('./routes/user');
const skillRouter = require('./routes/skill');
const projectRouter = require('./routes/project');
const technoRouter = require('./routes/techno');
const contactRouter = require('./routes/contact');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/images', express.static('images'));

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
// app.use((req,res,next)=>res.status(200).json({message:'App running!-)'}))

app.use('/api/auth/', userRouter);
app.use('/api/skills/', skillRouter);
app.use('/api/projects/', projectRouter);
app.use('/api/techno/', technoRouter);
app.use('/api/contact/', contactRouter);

module.exports = app;
