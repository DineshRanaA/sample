const decodeJWT = require("jwt-decode");

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

module.exports = utils;