const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.userLogin = (req, res, next) => {
	console.log(req.body);
	User.findOne({ email: req.body.email })
		.then((user) => {
			if (!user) {
				return res.status(400).json({ message: 'identifiants incorrects' });
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((validation) => {
					if (!validation) {
						return res.status(400).json({ message: 'identifiants incorrects' });
					}
					res.status(200).json({
						userId: user._id,
						token: jwt.sign(
							{
								userId: user._id,
							},
							'RANDOM_TOKEN_SECRET',
							{ expiresIn: '24h' },
						),
					});
				})
				.catch((error) => res.status(500).json({ message: 'erreur serveur' }));
		})
		.catch((error) => res.status(500).json({ message: 'erreur serveur' }));
};
