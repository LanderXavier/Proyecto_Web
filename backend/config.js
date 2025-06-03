// filepath: backend/config.js
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

// const config = {
//   database: {
//     host: process.env.DB_HOST || 'localhost',
//     dialect: 'mysql',
//     port: process.env.DB_PORT || 3306,
//     user: process.env.DB_USER || 'root',
//     password: process.env.DB_PASSWORD || '',
//     name: process.env.DB_NAME || 'proyecto',
//   },
//   server: {
//     port: process.env.PORT || 8000,
//   },
//   secretKey: process.env.SECRET_KEY || 'default_secret_key',
// };
const config = {
  database: {
    host: process.env.DB_HOST || 'mysqldb_1',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'proyecto',
  },
  server: {
    port: process.env.PORT || 8000,
  },
  secretKey: process.env.SECRET_KEY || 'default_secret_key',
};

module.exports = config;