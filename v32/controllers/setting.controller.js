const handler = require("express-async-handler");

const controller = {};

const viewModel = require("../models/viewModel.model");
const userModel = require("../models/users.model");
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
    await userModel.increment({inviteSentCount: 1},{where: {userId: req.user.userId}});
  }
  return res.status(200).json({
    statusCode: 200,
    message: "success",
    data : {}
  });
});

controller.followingList = handler(async (req, res) => {
  let pageSize = req?.body?.pageSize ?? 20;
  const followingUserIds = await helperUtils.getFollowingUserIds(req?.body?.userId);
  const userArr = await userModel.findAll({
    where: {userId: followingUserIds},
    order: [["userName","Asc"]],
    offset: helperUtils.getOffset(req, pageSize),
    limit: pageSize,
  });

  return res.status(200).json({
    statusCode: 200,
    message: "success",
    data : {
      userArr: userArr?.map((each) => ({
        id: (each?.id) ? each?.id.toString() : "",
        userId: (each?.userId) ? each?.userId.toString() : "",
        userName: each?.userName,
        profileName: each?.profileName,
        userImg: each?.userImg,
      }))
    }
  });
});

controller.followersList = handler(async (req, res) => {
  let pageSize = req?.body?.pageSize ?? 20;
  const followersUserIds = await helperUtils.getFollowersUserIds(req?.body?.userId);
  const userArr = await userModel.findAll({
    where: {userId: followersUserIds},
    order: [["userName","Asc"]],
    offset: helperUtils.getOffset(req, pageSize),
    limit: pageSize,
  });

  return res.status(200).json({
    statusCode: 200,
    message: "success",
    data : {
      userArr: userArr?.map((each) => ({
        id: (each?.id) ? each?.id.toString() : "",
        userId: (each?.userId) ? each?.userId.toString() : "",
        userName: each?.userName,
        profileName: each?.profileName,
        userImg: each?.userImg,
      }))
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