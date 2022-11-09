'use strict';
const { v4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('RawMaterials', [
      {
        id: v4(),
        textContentId: v4(),
        fiberName: 'fiberName 1',
        climateChange: 1,
        fossilDepletion: 1,
        freshwatterConsunsuption: 1,
        freshwatterEutrophication: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RawMaterials', null, {});

  }
};
