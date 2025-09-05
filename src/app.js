require('dotenv').config();
//Importções de pacotes e middlewares
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
require('module-alias/register');
const fs = require('fs');

//importação das inflrastruturas
const errorHandler = require('./Infrastructure/Express/middlewares/errorHandler');
const SequelizeUserRepository = require('./Infrastructure/Persistence/Sequelize/SequelizeUserRepository');
const RedisTokenBlacklistRepository = require('./Infrastructure/Persistence/Redis/RedisTokenBlacklistRepository');
const JWTProvider = require('./Infrastructure/Providers/jwtProvider');
const authRoutes = require('./Infrastructure/Express/routes/routes');

//importação dos casos de uso
const RegisterUser = require('./Application/UseCases/Auth/RegisterUser');
const LoginUser = require('./Application/UseCases/Auth/LoginUser');
const LogoutUser = require('./Application/UseCases/Auth/LogoutUser');

const app = express();

//Middlewares globais
app.use(express.json());
app.use(cors()); 
app.use(morgan('dev'));

//Injeção de dependências
//Repositórios
const userRepository = new SequelizeUserRepository();
const tokenBlacklistRepository = new RedisTokenBlacklistRepository();

//Provedores
const jwtProvider = new JWTProvider();

//use cases
const registerUserUseCase = new RegisterUser(userRepository, jwtProvider);
const loginUserUseCase = new LoginUser(userRepository, jwtProvider);
const logoutUserUseCase = new LogoutUser(tokenBlacklistRepository, jwtProvider);

//Rotas
app.use('/auth', authRoutes(registerUserUseCase, loginUserUseCase, logoutUserUseCase, jwtProvider));

//Configuração do Swagger
try {
    const swaggerDocument = yaml.load(fs.readFileSync('./Api-docs/swagger.yml', 'utf8'));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (e) {
    console.error('Failed to load swagger config file:', e);
}

app.use(errorHandler);

module.exports = app;

