'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Error! Field {email} is required!"
          },
          notNull: {
            msg: "Error! Field {email} is required!"
          },
          isEmail: {
            msg: "Error! Field {email} must be an email!"
          },
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Error! Field {password} is required!"
          },
          notNull: {
            msg: "Error! Field {password} is required!"
          },
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Error! Field {name} is required!"
          },
          notNull: {
            msg: "Error! Field {name} is required!"
          },
        }
      },
      permission: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "USER"
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
    await queryInterface.dropTable('Users');
  }
};