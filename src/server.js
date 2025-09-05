const app = require('./app');
const sequelize = require('src/Infrastructure/Persistence/Sequelize/database'); // Corrigir nome da variável
const { User } = require("src/Infrastructure/Persistence/Sequelize/Models"); // Importar modelo corretamente
const { connectRedis } = require('src/Infrastructure/Persistence/Redis/RedisClient');
const config = require('./config/index');
const { Connection } = require('pg');
const PORT = config.server.port;

async function startServer() {
   try {
       // Sincroniza o modelo de usuário com o banco de dados
       // Em produção, considere usar migrações
       await sequelize.authenticate(); // Testa a conexão com o banco de dados
       await sequelize.sync({alter: true}); // Cria ou altera a tabela de usuários no banco de dados
       console.log('Database connected and synchronized.');

       await connectRedis(); // Conecta ao Redis

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