const express = require("express");
const router = express.Router();

// ROUTES
const rewardRoutes = require("./routes/chatTheme.route");

router.use("/chatTheme", rewardRoutes);

module.exports = router;
