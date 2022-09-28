const Sequelize = require("sequelize");
const db = require("./index");

const hideRelation = db.define(
  "hideRelation",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    listUserId: {
      field: "listUserId",
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    relationUserId: {
      field: "relationUserId",
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
        field: "type",
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
      field: "date",
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "hideRelation",
  }
);

module.exports = hideRelation;
