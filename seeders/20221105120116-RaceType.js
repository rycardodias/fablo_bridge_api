'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('RaceTypes', [
      {
        name: 'Type 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Type 2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
     await queryInterface.bulkDelete('RaceTypes', null, {});
  }
};
