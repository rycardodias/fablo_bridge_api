'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CompanyCertifications', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      issueDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      expirationDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      CompanyId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Companies',
          key: 'id'
        }
      },
      CompanyCertificationTypeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'CompanyCertificationTypes',
          key: 'id'
        }
      },
      CertifyingEntityId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'CertifyingEntities',
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
    await queryInterface.dropTable('CompanyCertifications');
  }
};