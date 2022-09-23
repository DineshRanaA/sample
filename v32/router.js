const express = require("express");
const router = express.Router();

// ROUTES
const rewardRoutes = require("./routes/setting.route");

router.use("/common", rewardRoutes);

module.exports = router;
