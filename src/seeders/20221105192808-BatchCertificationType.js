'use strict';
const { v4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('BatchCertificationTypes', [
      {
        id: v4(),
        name: 'BatchCertificationTypes 1',
        description: 'BatchCertificationTypes Description 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        name: 'BatchCertificationTypes 2',
        description: 'BatchCertificationTypes Description 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('BatchCertificationTypes', null, {});
  }
};
