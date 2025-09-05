const RegisterUserInput = require('src/Application/DTOs/RegisterUserInput');
const LoginUserInput = require('src/Application/DTOs/LoginUserInput');
const LogoutUser = require('../../../Application/UseCases/Auth/LogoutUser');

class AuthController {
    constructor(registerUserCase, loginUserUseCase, logoutUserUseCase) {
        this.registerUserCase = registerUserCase; 
        this.loginUserUseCase = loginUserUseCase; 
        this.logoutUserUseCase = logoutUserUseCase; 
    }

    async register(req, res, next) {
        try {
            const name = typeof req.body.name === "string" ? req.body.name : String(req.body.name);
            const email = typeof req.body.email === "string" ? req.body.email : String(req.body.email);
            const password = typeof req.body.password === "string" ? req.body.password : String(req.body.password);

            const input = new RegisterUserInput(name, email, password);
            const userOutput = await this.registerUserCase.execute(input);
            res.status(201).json(userOutput);
        } catch (error) {
            if (error.name === "UserAlreadyExistsException") {
                return res.status(400).json({ error: error.message });
            }
            if (error.name === "SequelizeValidationError") {
                return res.status(400).json({
                    error: error.errors.map(e => e.message).join(', ')
                });
            }
            next(error);
        }
    }



    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const input = new LoginUserInput(email, password);
            const authOutput = await this.loginUserUseCase.execute(input);
            return res.status(200).json(authOutput);
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            const { token, user: decodedToken } = req;
            
            await this.logoutUserUseCase.execute(token, decodedToken);
            
            res.status(200).json({ status: 'success', message: 'Logout realizado com sucesso.' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthController;

