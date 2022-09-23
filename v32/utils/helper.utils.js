const decodeJWT = require("jwt-decode");
const crypto = require("crypto");
const config = require("../config");

const algorithm = config.getConfig().ALGORITHM; //Using AES encryption
const key = config.getConfig().ENCRYPT_KEY;
const iv = Buffer.alloc(16).fill(0);

const utils = {};

utils.validateUser = async (req, res, next) => {
    const token = req?.headers?.authorization?.split("Bearer ")?.[1];
    if (token) {
      const user = decodeJWT(token);
      if (!user?.user_id)
        return res.status(403).json({
          statusCode: 403,
          message: "token Invalid",
        });
      req.user = {
        userId: user?.user_id,
      };
      next();
    } else {
        return res.status(403).json({
            statusCode: 403,
            message: "token Invalid",
        });
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

module.exports = utils;