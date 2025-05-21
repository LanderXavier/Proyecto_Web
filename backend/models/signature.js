const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Signature = sequelize.define('Signature', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  curricular_unit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  UOC: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  learning_outcomes: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  total_hours: {
    type: DataTypes.NUMERIC,
    allowNull: false,
  },
  semester: {
    type: DataTypes.NUMERIC,
    allowNull: false,
  },
  school: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  //carrer: {
    //type: DataTypes.STRING,
    //allowNull: false,
  //},
  }
, {
  tableName: 'Signature', // Nombre de la tabla en la base de datos
  timestamps: false,
});

module.exports = Signature;
