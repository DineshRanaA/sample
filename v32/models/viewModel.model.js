const Sequelize = require("sequelize");
const db = require("./index");

const viewModel = db.define(
  "viewModel",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    referralContestTabShow: {
      field: "referralContestTabShow",
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    momentStreakTabShow: {
      field: "momentStreakTabShow",
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    defaultFriends: {
      field: "defaultFriends",
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    inviteBoxShow: {
      field: "inviteBoxShow",
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    referralView: {
      field: "referralView",
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    referralWinner: {
      field: "referralWinner",
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "viewModel",
  }
);

module.exports = viewModel;
