const handler = require("express-async-handler");

const controller = {};

const ChatTheme = require("../models/chat.theme.model");

controller.getChatTheme = handler(async (req, res) => {
    // const chatTheme = await ChatTheme.findAll({
    //     order: [["id", "DESC"]],
    // });
    // return res.json(chatTheme);

    return res.status(200).json({
        statusCode: 200
      });
});

module.exports = controller;