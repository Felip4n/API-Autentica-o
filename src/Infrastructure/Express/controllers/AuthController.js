const RegisterUserInput = require('src/Application/DTOs/RegisterUserInput');
const LoginUserInput = require('src/Application/DTOs/LoginUserInput');

class AuthController {
    constructor(registerUserCase, loginUserUseCase) {
        this.registerUserCase = registerUserCase; //Instância de RegisterUser
        this.loginUserUseCase = loginUserUseCase; //Instância de LoginUser
    }

    async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const input = new RegisterUserInput(name, email, password);
            const userOutput = await this.registerUserCase.execute(input);
            res.status(201).json(userOutput);
        } catch (error) {
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
                //Aqui você pode implementar a lógica de logout, se necessário.
                //por exemplo, invalidar o token no lado do cliente.
                //const token = req.headers.authorization?.split(' ')[1];
                //await this.authService.invalidateToken(token);
                return res.status(200).json({ message: 'Logout successful' });
            }
            catch (error) {
                next(error);
            }
        }
 }

module.exports = AuthController;