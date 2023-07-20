const chalk = require("chalk");
const handleError = (res, status, message) => {
  console.log(chalk.redBright(message));
  res.status(status).send(message);
};

exports.handleError = handleError;
