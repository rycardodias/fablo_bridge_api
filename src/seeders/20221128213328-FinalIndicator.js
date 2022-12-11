'use strict';
const { v4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('FinalIndicators', [
      {
        id: v4(),
        name: 'FinalIndicator 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        name: 'FinalIndicator 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('FinalIndicators', null, {});
  }
};
