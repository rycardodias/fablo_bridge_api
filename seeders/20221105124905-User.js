'use strict';
const bcrypt = require('bcrypt');
const UUID = require('uuid').v4();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        id: UUID,
        email: 'admin@email.com',
        name: 'Administrator',
        password: await bcrypt.hashSync('admin', 10),
        permission: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: UUID,
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
