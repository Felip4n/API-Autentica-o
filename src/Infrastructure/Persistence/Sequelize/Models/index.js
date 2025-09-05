'use strict';

const fs = require('fs');
const path = require('path');
// 1. Importe a CLASSE Sequelize com 'S' maiúsculo.
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// Corrigi um espaçamento estranho no caminho do require
const config = require(__dirname + '/../../../../config/config.js')[env];s
const db = {};

// 2. Declare a variável da instância APENAS UMA VEZ.
let sequelize;

// 3. Use a CLASSE 'Sequelize' para criar a instância.
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  // 4. Chame o .forEach diretamente no resultado do .filter
  .forEach(file => {
    // 5. Passe 'Sequelize.DataTypes' (com 'S' maiúsculo) para os modelos
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
// 6. Removi a segunda atribuição que era idêntica
db.Sequelize = Sequelize; // É uma boa prática exportar a classe também

module.exports = db;