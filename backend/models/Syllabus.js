const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Program = require('./Program');


const Syllabus = sequelize.define('Syllabus', {
  ID_Syllabus: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  ID_program: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  professor_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  academic_term: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  upload_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  document_path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['true', 'false']],
    },
  },
  parallel_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weekly_class_schedule: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  weekly_tutoring_schedule: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  evaluation_midterm: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  evaluation_formative: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  evaluation_lab: {
    type: DataTypes.FLOAT,
    allowNull: true,  // Puede ser nulo
  },
  evaluation_final: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'Syllabus',
  timestamps: false,
  
});
Syllabus.belongsTo(Program, { foreignKey: 'ID_program' });
module.exports = Syllabus;
