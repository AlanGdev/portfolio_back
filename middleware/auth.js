const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return res
			.status(401)
			.json({ message: 'Accès non autorisé, token manquant' });
	}

	try {
		const decoded = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
		req.user = decoded;
		next();
	} catch (error) {
		res.status(403).json({ message: 'Token invalide' });
	}
};

module.exports = auth;
