'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = await queryInterface.sequelize.query('Select * from "RaceTypes";', {
      type: Sequelize.QueryTypes.SELECT
    })

    await queryInterface.bulkInsert('Races', [
      {
        name: "Race 1",
        RaceTypeId: data[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Race 2",
        RaceTypeId: data[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Races', null, {});
  }
};
