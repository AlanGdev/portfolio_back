const http = require('http');
const app = require('./app');
const normalize_PORT = (val) => {
	const port = parseInt(val, 10);
	if (isNaN(port)) {
		return val;
	}
	if (port >= 0) {
		return port;
	}
	return false;
};
const port = normalize_PORT(process.env.PORT || '4000');

app.set('port', port);
const errorHandler = (error) => {
	if (error.syscall !== 'listen') {
		throw error;
	}
	const address = server.address();
	const bind = typeof address === 'string' ? 'pipe' + address : 'port' + port;
	switch (error.code) {
		case 'EACCES':
			console.error(bind + 'requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + 'already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
};
const server = http.createServer(app);
server.on('error', errorHandler);
server.on('listening', () => {
	const address = server.address();
	const bind = typeof address === 'string' ? 'pipe' + address : 'port' + port;
	console.log('listening on' + bind);
});
server.listen(port);
