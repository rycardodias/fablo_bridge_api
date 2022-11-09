'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RawMaterials', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      textContentId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fiberName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      climateChange: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fossilDepletion: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      freshwatterConsunsuption: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      freshwatterEutrophication: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('RawMaterials');
  }
};