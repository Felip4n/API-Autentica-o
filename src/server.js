const app = require('./app');
const Sequelize = require('src/Infrastructure/Persistence/Sequelize/database');
const UserModel = require("src/Infrastructure/Persistence/Sequelize/Models/UserModel");//Importa o modelo de usuário
const { connectRedis } = require('src/Infrastructure/Persistence/Redis/RedisClient');
const config = require('./config/index');
const { Connection } = require('pg');
const PORT = config.server.port;

async function startServer() {
    try {
        //Sicroniza o modelo de usuário com o banco de dados
        //Em produção, considere usar migrações
        await Sequelize.authenticate();//Testa a conexão com o banco de dados
        await Sequelize.sync({alter: true});//Cria ou altera a tabela de usuários no banco de dados
        console.log('Database connected and synchronized.');

        await connectRedis(); //Conecta ao Redis

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Access API docs at http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error('Unable to start the server:', error);
        process.exit(1);
    }
}

startServer();

