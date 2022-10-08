const decodeJWT = require("jwt-decode");
const crypto = require("crypto");
require('dotenv').config();

const Log = require("../models/log.model");
const hideRelation = require("../models/hideRelation.model");
const users = require("../models/users.model");
const relationModel = require("../models/relation.model");

const algorithm = process.env.ALGORITHM; //Using AES encryption
const key = process.env.ENCRYPT_KEY;
const iv = Buffer.alloc(16).fill(0);

const { Op } = require("sequelize");
const sequelize = require("../config/sequelizeDb.config");

const utils = {};

utils.validateUser = async (req, res, next) => {
  var statusCode = 403;
  const invalidData = {
    statusCode: statusCode,
    message: "token Invalid",
  };
  try {
    const token = req?.headers?.authorization?.split("Bearer ")?.[1];
    if(token) {
      const decode = decodeJWT(token);
      if (!decode?.user_id)
        return res.status(statusCode).json(invalidData);
      const user = await users.findOne({where: {userId: decode?.user_id}});
      if (!user) return res.status(statusCode).json(invalidData);
      req.user = user.toJSON();
      next();
    } else {
      return res.status(statusCode).json(invalidData);
    }
  } catch (err) {
    console.log(err);
    return res.status(statusCode).json(invalidData);
  }
};

utils.encrypt = (text) => {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text.toString());
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString("hex");
}; 

utils.decrypt = (text) => {
  let encryptedText = Buffer.from(text, "hex");
  let decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(key),
    Buffer.from(iv, "hex")
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

utils.getBlockedUserIds = (userId = "") =>
new Promise(async (resolve, reject) => {
  try {
    const blockedUserIds = await hideRelation.findAll({
      attributes: ["relationUserId"],
      where: {
        listUserId: userId,
        type: 2,
      }
    });
    resolve(blockedUserIds?.map((each) => each?.relationUserId));
  } catch (err) {
    reject(err);
  }
});

utils.getBlockedByUserIds = (userId = "") =>
new Promise(async (resolve, reject) => {
  try {
    const blockedByUserIds = await hideRelation.findAll({
      attributes: ["listUserId"],
      where: {
        relationUserId: userId,
        type: 2,
      }
    });
    resolve(blockedByUserIds?.map((each) => each?.listUserId));
  } catch (err) {
    reject(err);
  }
});

utils.getFollowingUserIds = (userId) =>
new Promise(async (resolve, reject) => {
  try {
    const blockedUserIds = await utils.getBlockedUserIds(userId);
    const blockedByUserIds = await utils.getBlockedByUserIds(userId);
    const followingUserIds = await relationModel.findAll({
      attributes:["relationUserId"],
      where: {
        listUserId: userId,
        type: 2,
        relationUserId: {
          [Op.notIn]: [...blockedByUserIds, ...blockedUserIds],
        },
      },
      group: ["relationUserId"],
      raw: true,
    });
    resolve(followingUserIds?.map((each) => each?.relationUserId));
  } catch (err) {
    reject(err);
  }
});

utils.getFollowersUserIds = (userId) =>
new Promise(async (resolve, reject) => {
  try {
    const blockedUserIds = await utils.getBlockedUserIds(userId);
    const blockedByUserIds = await utils.getBlockedByUserIds(userId);
    const followersUserIds = await relationModel.findAll({
      attributes:["listUserId"],
      where: {
        relationUserId: userId,
        type : 2,
        listUserId: {
          [Op.notIn]: [...blockedByUserIds, ...blockedUserIds],
        },
      },
      group: ["listUserId"],
      raw: true,
    });
    resolve(followersUserIds?.map((each) => each?.listUserId));
  } catch (err) {
    reject(err);
  }
});

utils.errorLogging = (data) => {
  Log.create({
    logType: "SERVER_ERROR",
    url: data.url,
    body: data.body,
    data: JSON.parse(data.message),
    userId: data?.userId,
  });
};

utils.clientErrorLogging = (data) => {
  Log.create({
    logType: "CLIENT_ERROR",
    url: data.url,
    body: data.body,
    data: {
      message: data.message,
    },
    userId: data?.userId,
  });
};

utils.getOffset = (req, limit) => {
  const page = req?.body?.page ? parseInt(req?.body?.page) : 1;
  return (page - 1) * limit;
};

module.exports = utils;