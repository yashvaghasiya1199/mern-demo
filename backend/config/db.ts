
const Sequelize = require("sequelize")
const dotenv = require("dotenv")

dotenv.config();

var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
});



module.exports={ sequelize}
