const {database} = require('sequelize.js');
const sequelize = require('sequelize');

const UserModel = database.define('User', {
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
    password: {// armazenar hash da senha
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'users',
    timestamps: true,// createdAt e updatedAt
});

module.exports = UserModel;
// Definir o modelo de usuário