// Carrega as variáveis de ambiente do arquivo .env para process.env
require('dotenv').config();

module.exports = {
  development: {
    // Lê a URL do banco de dados diretamente das variáveis de ambiente
    url: process.env.DB_URL || 'postgres://user:password@localhost:5432/mydb',
    dialect: process.env.DB_DIALECT || 'postgres',
  },
  test: {
    url: process.env.DB_URL || 'postgres://user:password@localhost:5432/mydb',
    dialect: process.env.DB_DIALECT || 'postgres',
  },
  production: {
    url: process.env.DB_URL || 'postgres://user:password@localhost:5432/mydb',
    dialect: process.env.DB_DIALECT || 'postgres',
  },
};