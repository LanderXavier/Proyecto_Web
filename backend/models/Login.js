const { DataTypes } = require('sequelize');
const sequelize = require('./db'); // Ruta correcta al archivo db.js

const Login = sequelize.define('Login', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true, // Usa `email` como clave primaria
    validate: {
      isEmail: true, // Valida que sea un email válido
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'login', // Nombre de la tabla en la base de datos
  timestamps: true, // Agrega columnas `createdAt` y `updatedAt`
});

module.exports = Login;