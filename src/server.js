const app = require('./app');
const Sequelize = require('src/Infrastructure/Persistence/Sequelize/database');
const UserModel = require("src/Infrastructure/Persistence/Sequelize/Models/UserModel");//Importa o modelo de usuário
const RedisClient = require('src/Infrastructure/Persistence/Redis/RedisClient');
const config = require('./config/index');
const { Connection } = require('pg');

const PORT = config.server.port;

async function startServer() {
    try {
        //Sicroniza o modelo de usuário com o banco de dados
        //Em produção, considere usar migrações em vez de sync({ force: true })
        await Sequelize.authenticate();//Testa a conexão com o banco de dados
        await Sequelize.sync({alter: true});//Cria ou altera a tabela de usuários no banco de dados
        console.log('Database connected and synchronized.');

        await ConnectRedis(); //Conecta ao Redis

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`acces API at http://localhost:${PORT}/api`);
        });
    } catch (error) {
        console.error('Unable to start the server:', error);
        process.exit(1);
    }
}

startServer();

