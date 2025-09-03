//Importções de pacotes e middlewares
const express = require('express');
const cors = require('cors'); //para permitir requisições de diferentes origens
const morgan = require('morgan'); //para logar requisições HTTP
const swaggerUi = require('swagger-ui-express'); //para documentação da API
const yaml = require('js-yaml'); //para carregar arquivos YAML
require('module-alias/register'); //para usar aliases nos imports
const fs = require('fs');

//importação das inflrastruturas
const errorHandler = require('./Infrastructure/Express/middlewares/errorHandler');
const SequelizeUserRepository = require('./Infrastructure/Persistence/Sequelize/SequelizeUserRepository');
const RedisTokenBlacklistRepository = require('./Infrastructure/Persistence/Redis/RedisTokenBlacklistRepository');
const jwtProvider = require('./Infrastructure/Providers/jwtProvider');
const authRoutes = require('./Infrastructure/Express/routes/auth.routes');

//importação dos casos de uso
const RegisterUser = require('./Application/UseCases/Auth/RegisterUser');
const LoginUser = require('./Application/UseCases/Auth/LoginUser');

const app = express();

//Middlewares globais
app.use(express.json()); //para parsear JSON no corpo das requisições
app.use(cors()); //habilita CORS
app.use(morgan('dev')); //loga requisições HTTP no console

//Injeção de dependências
//Repositórios
const userRepository = new SequelizeUserRepository();
const tokenBlacklistRepository = new RedisTokenBlacklistRepository();

//Provedores
const jwtProvider = new JWTProvider();

//use cases
const registerUserUseCase = new RegisterUser(userRepository);
const loginUserUseCase = new LoginUser(userRepository, jwtProvider);    

//Rotas

app.use('/auth', authRoutes(registerUserUseCase, loginUserUseCase));

//Configuração do Swagger
try {
    const swaggerDocument = yaml.load(fs.readFileSync('./docs/swagger.yaml', 'utf8'));
    //Acessível em http://localhost:3000/api-docs
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (e) {
    console.error('Failed tp load swegger.yml file:', e);
}

//Middleware de tratamento de erros
//Deve ser o último middleware
app.use(errorHandler);

module.exports = app;