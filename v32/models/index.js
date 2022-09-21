const Sequelize = require("sequelize");

const config = require("../config");

const sequelize = new Sequelize(
    config.getConfig().MYSQL_DB,
    config.getConfig().MYSQL_USERNAME,
    config.getConfig().MYSQL_PASSWORD,
  {
    host: config.getConfig().MYSQL_HOST,
    port: config.getConfig().MYSQL_PORT,
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