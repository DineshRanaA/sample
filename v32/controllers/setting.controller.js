const handler = require("express-async-handler");

const controller = {};

const viewModel = require("../models/viewModel.model");
const helperUtils = require("../utils/helper.utils");

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