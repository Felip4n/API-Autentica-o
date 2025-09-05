const { Sequelize } = require('sequelize');
const config = require('src/config');

const sequelize = new Sequelize(config.db.url, {
    dialect: config.db.dialect,
    logging: false, // Era 'loggin'
}); 

module.exports = sequelize;