const express = require("express");
const router = express.Router();

const { handlerError } = require("./utils/error.utils");

// ROUTES
const rewardRoutes = require("./routes/setting.route");
const chatRoutes = require("./routes/chat.route");

router.use("/common", rewardRoutes);
router.use("/chat", chatRoutes);

router.use((err, req, res, next) => handlerError(err, req, res));

module.exports = router;
