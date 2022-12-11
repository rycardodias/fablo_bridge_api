'use strict';
const { v4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const companies = await queryInterface.sequelize.query('Select * from "Companies";', {
      type: Sequelize.QueryTypes.SELECT
    })

    const companyCertificationTypes = await queryInterface.sequelize.query('Select * from "CompanyCertificationTypes";', {
      type: Sequelize.QueryTypes.SELECT
    })
    const certifyingEntities = await queryInterface.sequelize.query('Select * from "CertifyingEntities";', {
      type: Sequelize.QueryTypes.SELECT
    })

    await queryInterface.bulkInsert('CompanyCertifications', [
      {
        id: v4(),
        issueDate: new Date(),
        expirationDate: new Date(),
        CompanyId: companies[0].id,
        CompanyCertificationTypeId: companyCertificationTypes[0].id,
        CertifyingEntityId: certifyingEntities[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CompanyCertifications', null, {});
  }
};
