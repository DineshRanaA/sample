const express = require("express");
const router = express.Router();

const chatController = require("../controllers/setting.controller");
const {validateUser} = require("../utils/helper.utils");

router.post("/appSetting", validateUser, chatController.getSetting);
router.get("/phoneDecrypt", validateUser, chatController.phoneDecrypt);
router.get("/phoneEncrypt", validateUser, chatController.phoneEncrypt);
router.post("/updateCount", validateUser, chatController.updateCount);
router.post("/followersList", validateUser, chatController.followersList);
router.post("/followingList", validateUser, chatController.followingList);

module.exports = router;
