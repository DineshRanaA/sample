const Sequelize = require("sequelize");
const db = require("../config/sequelizeDb.config");
const users = require("./users.model");

const relationModel = db.define(
  "relationModel",
  {
    relationId: {
      field: "relationId",
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
    relationUserId: {
        field: "relationUserId",
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    status: {
        field: "status",
        type: Sequelize.DataTypes.TINYINT,
        allowNull: false,
    },
    type: {
        field: "type",
        type: Sequelize.DataTypes.TINYINT,
        defaultValue: 0,
        allowNull: false,
    },
    notify: {
        field: "notify",
        type: Sequelize.DataTypes.TINYINT,
        defaultValue: 1,
        allowNull: false,
    },
    friends: {
        field: "friends",
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    unfriend: {
        field: "unfriend",
        type: Sequelize.DataTypes.TINYINT,
        defaultValue: 0,
        allowNull: false,
    },
    isHidden: {
        field: "isHidden",
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    followBackFriends: {
        field: "followBackFriends",
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "relation",
  }
);

relationModel.belongsTo(users, {
    foreignKey: "listUserId",
    targetKey: "userId",
    constraints: false,
});

module.exports = relationModel;
