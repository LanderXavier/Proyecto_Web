const { DataTypes } = require('sequelize');
const sequelize = require('./db'); // Importa la conexión a la base de datos

const Signature = sequelize.define('Signature_exp', {
  signature_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  // Agrega otras columnas según tu tabla
}, {
  tableName: 'signature', // Nombre de la tabla en la base de datos
});

module.exports = Signature;