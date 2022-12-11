'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      legalName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      shortName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      fiscalNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      caeType: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Companies');
  }
};