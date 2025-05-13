const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Login = sequelize.define('Login', {
  login_id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Clave primaria
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true, // Índice único
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'Login',
  timestamps: true,
});

module.exports = Login;