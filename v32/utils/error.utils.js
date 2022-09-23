
const chalk = require("chalk");

const utils = {};

utils.handlerError = async (err, req, res) => {
    // Draw Line for Serious Error
    if (err.message)
        console.log(chalk.redBright("-".repeat(process.stdout.columns)));

    // If User Info Available
    if (err) {
        if (req?.user?.userId) console.log(chalk.cyan(req.user?.userId));
    }

    // Console Error
    if (err.message) {
        console.log(chalk.redBright(err.message));
        console.log(chalk.redBright(err.stack) + "\t" + chalk.redBright(req.path))
        res.status(500).json({ statusCode: 500, message: err.message });
    }
};

module.exports = utils;
