const IUserRepository = require('src/Domain/Repositories/IUserRepository');
const UserModel = require('./Models').User;
const User = require('src/Domain/User/User');

class SequelizeUserRepository extends IUserRepository {
    async save(user) {
        const userData = user.toObject();
        const savedUser = await UserModel.create(userData);
        return savedUser;
    }

    async findById(id) {
        const userData = await UserModel.findByPk(id);
        if (!userData) return null;
        
        // Criar instância do User com os dados do banco
        return new User(
            userData.name,
            userData.email,
            userData.password, 
            userData.id
        );
    }

    async findByEmail(email) {
        const userData = await UserModel.findOne({ 
            where: { email } 
        });
        if (!userData) return null;
        
        // Criar instância do User com os dados do banco
        return new User(
            userData.name,
            userData.email,
            userData.password, 
            userData.id
        );
    }
}

module.exports = SequelizeUserRepository;