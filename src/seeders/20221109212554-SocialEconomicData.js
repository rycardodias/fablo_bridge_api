'use strict';
const { v4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = await queryInterface.sequelize.query('Select * from "Companies";', {
      type: Sequelize.QueryTypes.SELECT
    })
    const CompanyId = data[0].id
    await queryInterface.bulkInsert('SocialEconomicData', [
      {
        id: v4(),
        name: 'SocialEconomicData 1',
        value: 1,
        interval: ' Interval 1',
        createdAt: new Date(),
        updatedAt: new Date(),
        CompanyId: CompanyId
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SocialEconomicData', null, {});

  }
};
