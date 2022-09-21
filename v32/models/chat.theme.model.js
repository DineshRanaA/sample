const Sequelize = require("sequelize");
const db = require("./index");

const ChatTheme = db.define(
  "chatTheme",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    type: {
      field: "type",
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    themeImage: {
      field: "theme_image",
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "chat_theme",
  }
);

module.exports = ChatTheme;
