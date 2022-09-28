const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chat.controller");
const {validateUser} = require("../utils/helper.utils");

router.post("/getChatId", validateUser, chatController.getChatId);

module.exports = router;
