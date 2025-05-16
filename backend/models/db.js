// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('proyecto', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql',
// });

// sequelize.authenticate()
//   .then(() => console.log('Conexión a la base de datos exitosa'))
//   .catch(err => console.error('Error al conectar a la base de datos:', err));

// module.exports = sequelize;

const { Sequelize } = require('sequelize');
const config = require('../config');
require('dotenv').config(); // Asegúrate de cargar las variables del .env

const sequelize = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.password,
  {
    host: config.database.host,
    port: config.database.port,
    dialect: config.database.dialect,
  }
);

sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch(err => console.error('Error al conectar a la base de datos:', err));

module.exports = sequelize;
