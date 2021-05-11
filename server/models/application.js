'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Application.init({
    user_id: DataTypes.INTEGER,
    company: DataTypes.STRING,
    see_company: DataTypes.BOOLEAN,
    title: DataTypes.STRING,
    see_title: DataTypes.BOOLEAN,
    assessment: DataTypes.BOOLEAN,
    interview: DataTypes.BOOLEAN,
    rejection: DataTypes.BOOLEAN,
    hide_application: DataTypes.BOOLEAN,
    raised_hands: DataTypes.INTEGER,
    heart: DataTypes.INTEGER,
    tada: DataTypes.INTEGER,
    grinning: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Application',
  });
  return Application;
};