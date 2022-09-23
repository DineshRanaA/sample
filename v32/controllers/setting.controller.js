const handler = require("express-async-handler");

const controller = {};

const viewModel = require("../models/viewModel.model");

controller.getSetting = handler(async (req, res) => {
  console.log(req.user.userId);
  const viewModelRow = await viewModel.findAll({
    attributes: ["referralContestTabShow","momentStreakTabShow"]
  });
  
  return res.status(200).json({
    statusCode: 200,
    message: "success",
    data : {
      referralContestTabShow: viewModelRow.referralContestTabShow==0 ? false :true,
      momentStreakTabShow : viewModelRow.momentStreakTabShow==0 ? false :true
    }
  });
});

module.exports = controller;