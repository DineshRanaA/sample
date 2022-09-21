require("dotenv").config();

const environment = process.env.ENVIRONMENT;

const getConfig = () => {
  let config = {};

  switch (environment) {
    case "LOCAL":
      config = {
        MYSQL_HOST: "localhost",
        MYSQL_USERNAME: "root",
        MYSQL_PASSWORD: "root",
        MYSQL_DB: "hifrdsDb",
        MYSQL_PORT: 8889,
      };
      break;
    default:
      break;
  }

  return config;
};

module.exports = {
  environment,
  getConfig,
};
