const {Router} = require('express');
const AuthController = require("src/Infrastructure/Express/Controllers/authController");
const validate = require("src/Infrastructure/Express/middlewares/validationMiddleware");
const { registerSchema, loginSchema } = require("src/Infrastructure/Express/ValidationSchemas/authSchemas");

module.exports = (registerUserCase, loginUserUseCase) => {
    const router = Router();
    const authController = new AuthController(registerUserCase, loginUserUseCase);

    router.post('/register', validate(registerSchema), authController.register.bind(authController));
    router.post('/login', validate(loginSchema), authController.login.bind(authController));

    return router;
};
