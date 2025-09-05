// Carrega as variáveis de ambiente do arquivo .env para process.env
require("dotenv").config();

module.exports = {
  development: {
    use_env_variable: "DB_URL",
    dialect: process.env.DB_DIALECT || "postgres"
  },
  test: {
    use_env_variable: "DB_URL",
    dialect: process.env.DB_DIALECT || "postgres"
  },
  production: {
    use_env_variable: "DB_URL",
    dialect: process.env.DB_DIALECT || "postgres"
  }
};