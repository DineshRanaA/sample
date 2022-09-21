const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chatTheme.controller");

router.get("/getChatTheme", chatController.getChatTheme);

module.exports = router;
