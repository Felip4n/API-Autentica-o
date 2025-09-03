const db = require('../Infrastructure/Persistence/Sequelize/Models');

require('dotenv').config();
module.exports = {
    server: { port : process.env.PORT || 3000 },
    db: { url: process.env.DB_URL || 'postgres://user:password@localhost:5432/mydb',dialect: process.env.DB_DIALECT || 'postgres'},
    jwt : { secret: process.env.JWT_SECRET || 'your_jwt_secret', expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
    redis : { url: process.env.REDIS_URL || 'redis://localhost:6379', password: process.env.REDIS_PASSWORD || null }
};
// Configurações da aplicação