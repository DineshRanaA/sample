const handler = require("express-async-handler");

const controller = {};

const chatUser = require("../models/chatUser.model");

const { Op } = require("sequelize");

controller.getChatId = handler(async (req, res) => {
    const ifChatId = await chatUser.count({
        where: {
            recipientUserId: req?.body?.userId,
            senderUserId: req?.user?.userId,
        },
    });
    if(ifChatId) {
        const chatId = await chatUser.findOne({
            attributes: ["chatId","createdBy","createdOn"],
            where: {
                recipientUserId: req?.body?.userId,
                senderUserId: req?.user?.userId,
            },
        });

        return res.status(200).json({
            statusCode: 200,
            message: "success",
            data : {
                chatId: chatId.chatId,
                users : [{userId : req?.user?.userId},{userId : req?.body?.userId}],
                createdBy : chatId.createdBy.toString(),
                createdOn : chatId.createdOn,
            }
        });
    }

    const checkAlready = await chatUser.count({
        where: {
            recipientUserId: req?.user?.userId,
            senderUserId: req?.body?.userId,
        },
    });
    if(checkAlready) {
        const alreadyChatId = await chatUser.findOne({
            attributes: ["chatId","createdBy","createdOn"],
            where: {
                recipientUserId: req?.user?.userId,
                senderUserId: req?.body?.userId,
            },
        });

        await chatUser.create({
            chatId : alreadyChatId.chatId,
            senderUserId: req?.user?.userId,
            recipientUserId: req?.body?.userId,
            createdBy: alreadyChatId.createdBy,
            createdOn: new Date().toISOString(),
        });

        return res.status(200).json({
            statusCode: 200,
            message: "success",
            data : {
                chatId: alreadyChatId.chatId,
                users : [{userId : req?.user?.userId},{userId : req?.body?.userId}],
                createdBy : alreadyChatId.createdBy.toString(),
                createdOn : alreadyChatId.createdOn,
            }
        });
    }

    await chatUser.create({
        senderUserId: req?.user?.userId,
        recipientUserId: req?.body?.userId,
        createdBy: req?.user?.userId,
        createdOn: new Date().toISOString(),
    });

    const chatId = await chatUser.findOne({
        attributes: ["chatId","createdBy","createdOn"],
        where: {
            recipientUserId: req?.body?.userId,
            senderUserId: req?.user?.userId
        },
    });
  
    return res.status(200).json({
        statusCode: 200,
        message: "success",
        data : {
            chatId: chatId.chatId,
            users : [{userId : req?.user?.userId},{userId : req?.body?.userId}],
            createdBy : chatId.createdBy.toString(),
            createdOn : chatId.createdOn,
        }
    });
});

controller.checkDev = handler(async (req, res) => {
    //req?.user?.userId
    const ifChatId = await chatUser.count({
        where: {
            recipientUserId: req?.body?.userId,
            senderUserId: req?.body?.userId,
        },
    });
    if(ifChatId) {
        const chatId = await chatUser.findOne({
            attributes: ["chatId","createdBy","createdOn"],
            where: {
                recipientUserId: req?.body?.userId,
                senderUserId: req?.body?.userId,
            },
        });

        return res.status(200).json({
            statusCode: 200,
            message: "success",
            data : {
                chatId: chatId.chatId,
                users : [{userId : req?.body?.userId},{userId : req?.body?.userId}],
                createdBy : chatId.createdBy.toString(),
                createdOn : chatId.createdOn,
            }
        });
    }

    const checkAlready = await chatUser.count({
        where: {
            recipientUserId: req?.body?.userId,
            senderUserId: req?.body?.userId,
        },
    });
    if(checkAlready) {
        const alreadyChatId = await chatUser.findOne({
            attributes: ["chatId","createdBy","createdOn"],
            where: {
                recipientUserId: req?.body?.userId,
                senderUserId: req?.body?.userId,
            },
        });

        await chatUser.create({
            chatId : alreadyChatId.chatId,
            senderUserId: req?.body?.userId,
            recipientUserId: req?.body?.userId,
            createdBy: alreadyChatId.createdBy,
            createdOn: new Date().toISOString(),
        });

        return res.status(200).json({
            statusCode: 200,
            message: "success",
            data : {
                chatId: alreadyChatId.chatId,
                users : [{userId : req?.body?.userId},{userId : req?.body?.userId}],
                createdBy : alreadyChatId.createdBy.toString(),
                createdOn : alreadyChatId.createdOn,
            }
        });
    }

    await chatUser.create({
        senderUserId: req?.body?.userId,
        recipientUserId: req?.body?.userId,
        createdBy: req?.body?.userId,
        createdOn: new Date().toISOString(),
    });

    const chatId = await chatUser.findOne({
        attributes: ["chatId","createdBy","createdOn"],
        where: {
            recipientUserId: req?.body?.userId,
            senderUserId: req?.body?.userId
        },
    });
  
    return res.status(200).json({
        statusCode: 200,
        message: "success",
        data : {
            chatId: chatId.chatId,
            users : [{userId : req?.body?.userId},{userId : req?.body?.userId}],
            createdBy : chatId.createdBy.toString(),
            createdOn : chatId.createdOn,
        }
    });
});

module.exports = controller;