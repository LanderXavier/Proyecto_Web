const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Program = require('./Program');

const Syllabus = sequelize.define('Syllabus', {
  syllabus_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ID_program: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Program,
      key: 'ID_program',
    },
  },
  // Otros campos específicos del syllabus
  syllabus_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Agrega aquí otros campos necesarios
}, {
  tableName: 'Syllabus',
  timestamps: false,
});

// Relaciones Sequelize
Syllabus.belongsTo(Program, { foreignKey: 'ID_program' });
Program.hasMany(Syllabus, { foreignKey: 'ID_program' });

module.exports = Syllabus;