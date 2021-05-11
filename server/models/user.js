'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    company: DataTypes.BOOLEAN,
    title: DataTypes.BOOLEAN,
    raised_hands: DataTypes.INTEGER,
    heart: DataTypes.INTEGER,
    tada: DataTypes.INTEGER,
    grinning: DataTypes.INTEGER,
    total_apps: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};