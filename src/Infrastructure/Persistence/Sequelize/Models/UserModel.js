'use strict';
const { Model } = require('sequelize');

// A mágica acontece aqui: estamos exportando uma função.
module.exports = (sequelize, DataTypes) => {
  // Usamos o padrão de classe do Sequelize, que é mais moderno e flexível
  class User extends Model {
    // Você pode definir associações aqui no futuro
    static associate(models) {
      // Exemplo: models.Post.belongsTo(models.User)
    }
  }
  
  // O antigo sequelize.define() agora é User.init()
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  });

  // Retorna a classe do modelo
  return User;
};