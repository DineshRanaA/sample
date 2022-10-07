const handler = require("express-async-handler");

const controller = {};

const viewModel = require("../models/viewModel.model");
const userModel = require("../models/users.model");
const relationModel = require("../models/relation.model");
const helperUtils = require("../utils/helper.utils");

const { Op } = require("sequelize");


controller.getSetting = handler(async (req, res) => {
  const viewModelRow = await viewModel.findOne({
    attributes: ["referralContestTabShow","momentStreakTabShow"]
  });
  
  return res.status(200).json({
    statusCode: 200,
    message: "success",
    data : {
      referralContestTabShow: viewModelRow.referralContestTabShow==0 ? false : true,
      momentStreakTabShow : viewModelRow.momentStreakTabShow==0 ? false : true
    }
  });
});

controller.updateCount = handler(async (req, res) => {
  if(req.body.type=='invite') {
    await userModel.increment(
      {
        inviteSentCount: 1,
      },
      {
        where: {
          userId: req.user.userId,
        },
      }
    );

    /*await userModel.update({
      inviteSentCount: sequelize.literal('inviteSentCount + 1'),
    },
    { 
      where: {
        userId: req.user.userId,
      },
    });*/
  }
  return res.status(200).json({
    statusCode: 200,
    message: "success",
    data : {}
  });
});

controller.followersList = handler(async (req, res) => {
  const blockedUserIds = await helperUtils.getBlockedUserIds(req?.body?.userId);
  const blockedByUserIds = await helperUtils.getBlockedByUserIds(req?.body?.userId);
  const relationIds = await relationModel.findAll({
    attributes: ["relationId", "listUserId"],
    where: {
      relationUserId: req?.body?.userId,
      type : 2,
      listUserId: {
        [Op.notIn]: [...blockedByUserIds, ...blockedUserIds],
      },
    },
    include: [
      {
        attributes: ["userName", "profileImage", "profileName"],
        model: userModel,
        required: true,
      }
    ],
    order: [["relationId", "DESC"]],
  });

  const relarr = relationIds?.map((each) => ({
    id: (each?.relationId) ? each?.relationId.toString() : "",
    userId: (each?.listUserId) ? each?.listUserId.toString() : "",
    userName: each?.usersModel?.userName,
    profileName: each?.usersModel?.profileName,
    profileImage: each?.usersModel?.profileImage,
  }));

  return res.status(200).json({
    statusCode: 200,
    message: "success",
    data : {
      totalCount: relarr.length,
      userArr: relarr
    }
  });
});

controller.phoneEncrypt = handler(async (req, res) => {
  return res.status(200).json({
    statusCode: 200,
    message: "success",
    data : {
      phoneNumber: helperUtils.encrypt(req?.body?.number)
    }
  });
});

controller.phoneDecrypt = handler(async (req, res) => {
  return res.status(200).json({
    statusCode: 200,
    message: "success",
    data : {
      phoneNumber: helperUtils.decrypt(req?.body?.encryptNum)
    }
  });
});

module.exports = controller;