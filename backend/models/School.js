const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const School = sequelize.define('School', {
  id_school: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  school: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'School',
  timestamps: false,
});

module.exports = School;