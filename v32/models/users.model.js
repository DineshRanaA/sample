const Sequelize = require("sequelize");
const db = require("../config/mysqlSequelizeDb.config");

const usersModel = db.define(
  "usersModel",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      field: "userId",
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    loginDate: {
      field: "loginDate",
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    userName: {
      field: "userName",
      type: Sequelize.DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
    },
    profileImage: {
      field: "profileImage",
      type: Sequelize.DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
    },
    mobile: {
      field: "mobile",
      type: Sequelize.DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
    },
    countryCode: {
      field: "countryCode",
      type: Sequelize.DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
    },
    lastLoginDevice: {
      field: "lastLoginDevice",
      type: Sequelize.DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
    },
    signupStep: {
      field: "signupStep",
      type: Sequelize.DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: false,
    },
    fcm: {
      field: "fcm",
      type: Sequelize.DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
    },
    contactPermission: {
      field: "contactPermission",
      type: Sequelize.DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: false,
    },
    lastLogin: {
      field: "lastLogin",
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
    userLoginStatus: {
      field: "userLoginStatus",
      type: Sequelize.DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: false,
    },
    appVersion: {
      field: "appVersion",
      type: Sequelize.DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
    },
    profileName: {
      field: "profileName",
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      field: "dob",
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
    gender: {
      field: "gender",
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    friendsCount: {
      field: "friendsCount",
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    followingCount: {
      field: "followingCount",
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    followerCount: {
      field: "followerCount",
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    friendsContactCount: {
      field: "friendsContactCount",
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    momentStreak: {
      field: "momentStreak",
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    todayMomentStreak: {
      field: "todayMomentStreak",
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    referralCount: {
      field: "referralCount",
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    momentNotify: {
      field: "momentNotify",
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    referralNotify: {
      field: "referralNotify",
      type: Sequelize.DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: false,
    },
    randVisitProfile: {
      field: "randVisitProfile",
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    referralView: {
      field: "referralView",
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    noPostNotify: {
      field: "noPostNotify",
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    inviteSentCount: {
      field: "inviteSentCount",
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    momentStreakPopup: {
      field: "momentStreakPopup",
      type: Sequelize.DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: false,
    },
    referralPopup: {
      field: "referralPopup",
      type: Sequelize.DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: false,
    },
    momentStreakInviteBox: {
      field: "momentStreakInviteBox",
      type: Sequelize.DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: false,
    },
    discoverStoryType: {
      field: "discoverStoryType",
      type: Sequelize.DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: false,
    },
    inviteModelUser: {
      field: "inviteModelUser",
      type: Sequelize.DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: false,
    },
    inviteFlowStep: {
      field: "inviteFlowStep",
      type: Sequelize.DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: false,
    },
    invitePopupShow: {
      field: "invitePopupShow",
      type: Sequelize.DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: false,
    },
    findFriends: {
      field: "findFriends",
      type: Sequelize.DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: false,
    },
    homeScreenInvitePopup: {
      field: "homeScreenInvitePopup",
      type: Sequelize.DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: false,
    },
    referralPoint: {
      field: "referralPoint",
      type: Sequelize.DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "users",
  }
);

module.exports = usersModel;
