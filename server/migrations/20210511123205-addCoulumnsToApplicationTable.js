'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Applications',
      'raised_hands', {
      type: Sequelize.INTEGER
    },
      'heart', {
      type: Sequelize.INTEGER
    },
      'tada', {
      type: Sequelize.INTEGER
    },
      'grinning', {
      type: Sequelize.INTEGER
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Applications', 'raised_hands')
  }
};
