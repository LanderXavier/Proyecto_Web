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
  // Solo campos exclusivos de Syllabus
  syllabus_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  objetivos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  temas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  bibliografia: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  tableName: 'Syllabus',
  timestamps: false,
});

// Relaciones Sequelize
Syllabus.belongsTo(Program, { foreignKey: 'ID_program' });
Program.hasMany(Syllabus, { foreignKey: 'ID_program' });

module.exports = Syllabus;