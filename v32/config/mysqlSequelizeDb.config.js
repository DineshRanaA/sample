const Sequelize = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DBNAME,
    process.env.USERNAME,
    process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.DBPORT,
    benchmark: false,
    logging: false,
    dialect: "mysql",
    pool: {
      max: 100,
      min: 5,
      acquire: 30000,
      idle: 10000,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("v1 Connection established");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;