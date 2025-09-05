const User = require('src/Domain/User/User');
const UserOutput = require('src/Application/DTos/UserOutput');
const UserAlreadyExistsException = require('../../../Domain/Exceptions/UserAlreadyExistsException');

class RegisterUser {
    
    constructor(userRepository) {
        this.userRepository = userRepository; //IUserRepository
    }

    async execute(input) { //'input' é uma instância de RegisterUserInput
        const existingUser = await this.userRepository.findByEmail(input.email);
        if (existingUser) {
            throw new UserAlreadyExistsException('User with this email already exists.');
        }

        const user = await this.userRepository.save({
            name: input.name,
            email: input.email,
            password: input.password
        });

        // AQUI ESTÁ A CORREÇÃO:
        // Passamos 'null' como o primeiro argumento (token) e 'user' como o segundo.
        return new UserOutput(null, user);
    }
}

module.exports = RegisterUser;