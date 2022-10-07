const Sequelize = require("sequelize");
const db = require("../config/sequelizeDb.config");

const Log = db.define(
  "logs",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    logType: {
      field: "log_type",
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    body: {
      field: "body",
      type: Sequelize.DataTypes.JSON,
      allowNull: true,
    },
    url: {
      field: "api_url",
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    data: {
      field: "data",
      type: Sequelize.DataTypes.JSON,
      allowNull: true,
    },
    date: {
      field: "date",
      type: Sequelize.DataTypes.DATEONLY,
      defaultValue: Sequelize.NOW,
    },
    time: {
      field: "time",
      type: Sequelize.DataTypes.TIME,
      defaultValue: Sequelize.NOW,
    },
    userId: {
      field: "user_id",
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "logs",
  }
);

module.exports = Log;
