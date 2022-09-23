const express = require("express");
const router = express.Router();

const chatController = require("../controllers/setting.controller");
const {validateUser} = require("../utils/helper.utils");

router.get("/appSetting", validateUser, chatController.getSetting);

module.exports = router;
