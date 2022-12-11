'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Indicators', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      minInterval: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      maxInterval: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      penalty: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      goal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      formula: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      FinalIndicatorId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'FinalIndicators',
          key: 'id'
        }
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
    await queryInterface.dropTable('Indicators');
  }
};