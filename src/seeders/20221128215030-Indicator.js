'use strict';
const { v4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const finalIndicators = await queryInterface.sequelize.query('Select * from "FinalIndicators";', {
      type: Sequelize.QueryTypes.SELECT
    })

    await queryInterface.bulkInsert('Indicators', [
      {
        id: v4(),
        name: "Indicators 1",
        minInterval: 0,
        maxInterval: 1,
        penalty: 0,
        goal: "",
        formula: "",
        FinalIndicatorId: finalIndicators[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Indicators', null, {});
  }
};
