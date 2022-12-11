'use strict';
const { v4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Data', [
      {
        id: v4(),
        textContentId: 'textContentId',
        data: 'data',
        unity: 'unity',
        description: 'description',
        group: 0,
        master: 0,
        formulaCode: 'formulaCode',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Data', null, {});
  }
};
