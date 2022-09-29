const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config()

let db = null;

if (process.env.DATABASE_URL) {
  db = new Sequelize(process.env.DATABASE_URL)
} else {
  db = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
  });
}

module.exports = db