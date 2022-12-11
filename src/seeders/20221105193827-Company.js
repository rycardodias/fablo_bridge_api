'use strict';
const { v4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Companies', [
      {
        id: v4(),
        legalName: 'Company 1',
        shortName: 'shortName 1',
        fiscalNumber: 123123123,
        caeType: 123,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        legalName: 'Company 2',
        shortName: 'shortName 2',
        fiscalNumber: 321321321,
        caeType: 321,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Companies', null, {});
  }
};
