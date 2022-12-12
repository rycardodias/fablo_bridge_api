require('dotenv').config()

module.exports = {
  development: {
    username: "postgres",
    password: "root",
    database: "stv-development",
    host: "localhost",
    dialect: "postgres"
  },
  docker: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: "postgres"
  },
  production: {
    username: "postgres",
    password: "root",
    database: "stvgodigital",
    host: "127.0.0.1",
    dialect: "postgres"
  }
}