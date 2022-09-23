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
        ENCRYPT_KEY: "jWnZr4u7x!A%D*G-JaNdRgUkXp2s5v8y",
        ALGORITHM: "aes-256-cbc",
      };
      break;
    case "MAIN":
        config = {
          MYSQL_HOST: "research.hifrds.com",
          MYSQL_USERNAME: "nodetest",
          MYSQL_PASSWORD: "Pepul@1234",
          MYSQL_DB: "pepul_now",
          MYSQL_PORT: 3306,
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
