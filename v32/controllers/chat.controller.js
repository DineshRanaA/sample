const handler = require("express-async-handler");

const controller = {};

const chatUser = require("../models/chatUser.model");

const { Op } = require("sequelize");

controller.getChatId = handler(async (req, res) => {    
    const ifChatId = await chatUser.count({
        where: {
            recipientUserId: req?.body?.recipientId,
            senderUserId: req?.user?.userId
        },
    });
    if(ifChatId) {
        const chatId = await chatUser.findOne({
            attributes: [
                "chatId"
            ],
            where: {
                recipientUserId: req?.body?.recipientId,
                senderUserId: req?.user?.userId
            },
        });

        return res.status(200).json({
            statusCode: 200,
            message: "success",
            data : {
                chatId: chatId.chatId,
                users : []
            }
        });
    }

    await chatUser.create({
        senderUserId: req?.user?.userId,
        recipientUserId: req?.body?.recipientId,
        createdBy: req?.user?.userId,
        createdOn: new Date().toISOString(),
    });

    const chatId = await chatUser.findOne({
        attributes: ["chatId"],
        where: {
            recipientUserId: req?.body?.recipientId,
            senderUserId: req?.user?.userId
        },
    });
  
    return res.status(200).json({
        statusCode: 200,
        message: "success",
        data : {
            chatId: chatId.chatId,
            users : []
        }
    });
});

module.exports = controller;