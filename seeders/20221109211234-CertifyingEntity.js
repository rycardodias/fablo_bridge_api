'use strict';
const { v4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CertifyingEntities', [
      {
        id: v4(),
        name: 'CertifyingEntities 1',
        description: 'CertifyingEntities Description 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        name: 'CertifyingEntities 2',
        description: 'CertifyingEntities Description 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CertifyingEntities', null, {});

  }
};
