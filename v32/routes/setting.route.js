const express = require("express");
const router = express.Router();

const chatController = require("../controllers/setting.controller");
const {validateUser} = require("../utils/helper.utils");

router.post("/appSetting", validateUser, chatController.getSetting);
router.get("/phoneDecrypt", validateUser, chatController.phoneDecrypt);
router.get("/phoneEncrypt", validateUser, chatController.phoneEncrypt);
router.post("/updateCount", validateUser, chatController.updateCount);
router.get("/followersList", validateUser, chatController.followersList);

module.exports = router;
