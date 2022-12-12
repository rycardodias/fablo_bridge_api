const { Sequelize } = require('sequelize');
require('dotenv').config()

const config = require('./config')[process.env.NODE_ENV || "development"];

let db = null;

if (process.env.DATABASE_URL) {
  db = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: true
    }
  })
} else {
  db = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    protocol: 'postgres',
    logging: false,
  });
}

module.exports = db