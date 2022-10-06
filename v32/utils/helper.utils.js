const decodeJWT = require("jwt-decode");
const crypto = require("crypto");
require('dotenv').config();
const hideRelation = require("../models/hideRelation.model");

const algorithm = process.env.ALGORITHM; //Using AES encryption
const key = process.env.ENCRYPT_KEY;
const iv = Buffer.alloc(16).fill(0);

const utils = {};

utils.validateUser = async (req, res, next) => {
  console.log(req?.headers);
  const token = req?.headers?.authorization?.split("Bearer ")?.[1];
  if(token) {
    const user = decodeJWT(token);
    console.log(user?.user_id);
    if (!user?.user_id)
      return res.status(403).json({
        statusCode: 403,
        message: "token Invalid"
      });
    req.user = {userId: user?.user_id};
    next();
  } else {
    return res.status(403).json({
      statusCode: 403,
      message: "token Invalid"
    });
  }
};

module.exports = utils;

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

module.exports = utils;