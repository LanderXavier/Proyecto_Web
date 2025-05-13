const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Login = require('./Login');

const UserProfile = sequelize.define('UserProfile', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  login_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Login,
      key: 'login_id',
    },
  },
  role: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  school: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
}, {
  tableName: 'UserProfile',
  timestamps: false,
});

Login.hasOne(UserProfile, { foreignKey: 'login_id' });
UserProfile.belongsTo(Login, { foreignKey: 'login_id' });

module.exports = UserProfile;