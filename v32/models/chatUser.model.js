const Sequelize = require("sequelize");
const db = require("../config/sequelizeDb.config");

const chatUsers = db.define(
  "chatUsers",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    chatId: {
      field: "chatId",
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    senderUserId: {
      field: "senderUserId",
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    recipientUserId: {
        field: "recipientUserId",
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    createdBy: {
        field: "createdBy",
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    createdOn: {
      field: "createdOn",
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "chatUsers",
  }
);

module.exports = chatUsers;
