'use strict';
const bcrypt = require('bcrypt');
const { v4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        id: v4(),
        email: 'admin@email.com',
        name: 'Administrator',
        password: await bcrypt.hashSync('admin', 10),
        permission: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: v4(),
        email: 'user@email.com',
        name: 'User',
        password: await bcrypt.hashSync('user', 10),
        permission: 'USER',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
