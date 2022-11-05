'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Races', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      RaceTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'RaceTypes',
          key: 'id'
        }
      }
    });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Races');
  }
};