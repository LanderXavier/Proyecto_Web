const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Login = sequelize.define('Login', {
  login_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      isYachayEmail(value) {
        if (!value.endsWith('@yachaytech.edu.ec')) {
          throw new Error('El correo debe pertenecer al dominio @yachaytech.edu.ec');
        }
      },
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
