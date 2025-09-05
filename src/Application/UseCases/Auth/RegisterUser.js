const UserOutput = require('src/Application/DTos/UserOutput');
const UserAlreadyExistsException = require('../../../Domain/Exceptions/UserAlreadyExistsException');

class RegisterUser {
    constructor(userRepository, jwtProvider) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
    }

    async execute(input) {
        const existingUser = await this.userRepository.findByEmail(input.email);
        if (existingUser) {
            throw new UserAlreadyExistsException('User with this email already exists.');
        }

        const user = await this.userRepository.save({
            name: input.name,
            email: input.email,
            password: input.password
        });
        
        const token = this.jwtProvider.generateToken({ userId: user.id, email: user.email });

        return new UserOutput(token, user);
    }
}

module.exports = RegisterUser;