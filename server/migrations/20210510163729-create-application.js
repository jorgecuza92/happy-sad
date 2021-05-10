'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Applications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      company: {
        type: Sequelize.STRING
      },
      see_company: {
        type: Sequelize.BOOLEAN
      },
      title: {
        type: Sequelize.STRING
      },
      see_title: {
        type: Sequelize.BOOLEAN
      },
      assessment: {
        type: Sequelize.BOOLEAN
      },
      interview: {
        type: Sequelize.BOOLEAN
      },
      rejection: {
        type: Sequelize.BOOLEAN
      },
      hide_application: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Applications');
  }
};