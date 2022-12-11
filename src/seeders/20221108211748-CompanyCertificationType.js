'use strict';
const { v4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CompanyCertificationTypes', [
      {
        id: v4(),
        name: 'CompanyCertificationTypes 1',
        description: 'description 1',
        logo: 'img.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CompanyCertificationTypes', null, {});
  }
};
