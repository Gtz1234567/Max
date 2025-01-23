const mongoose = require('mongoose');

module.exports = async (client) => {
	const MONGO_URI = client.config.database;

	await mongoose.connect(MONGO_URI);

	if (mongoose.connect) {
		console.log('BANCO DE DADOS CONECTADO.');
	} else {
		console.log('Não foi possível conectar ao banco de dados devido a um erro.');
	}

	console.log(`${client.user.tag} is ready!`);
}