const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Signature = require('./signature');

const Program = sequelize.define('Program', {
  ID_program: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  signature_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Signature,
      key: 'id',
    },
  },
  curricular_unit: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  teaching_hours: {
    type: DataTypes.NUMERIC,
    allowNull: false,
  },
  internship_hours: {
    type: DataTypes.NUMERIC,
    allowNull: false,
  },
  independent_learning_hours: {
    type: DataTypes.NUMERIC,
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
  methodology: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  prerequisites: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  corequisites: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  learning_outcomes: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  bibliography: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  objectives: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  units: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  learningOutcomes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  bibliographyMain: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  bibliographyComplementary: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  contribution: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  major: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  course: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  study_mode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pendiente',
  },
}, {
  tableName: 'Program', // Nombre de la tabla en la base de datos
  timestamps: false, // Si no necesitas columnas `createdAt` y `updatedAt`
});

// Relaciones Sequelize
Program.belongsTo(Signature, { foreignKey: 'signature_id' });
Signature.hasMany(Program, { foreignKey: 'signature_id' });

module.exports = Program;
