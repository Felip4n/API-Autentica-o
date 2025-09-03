const { sequelize } = require('./sequelize');
const config = require('src/config');

const sequelize = new Sequelize(config.db.url, {
    dialect: config.db.dialect, // Postgres, MySQL, etc
    loggin: false, //Desibilitar logs do sequelize para a produção
}); 

module.exports = sequelize;
// Configurar a conexão com o banco de dados