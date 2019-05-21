const chalk = require("chalk");

const log = (msg, type) => {
  const prefix = chalk.hex("#0154FF").bold("@significa ");
  let typeMessage = chalk.hex("#0154FF").bold(`➜ ${msg}`);

  if (type === "success") {
    typeMessage = chalk.green.bold(`✔︎ ${msg}`);
  } else if (type === "error") {
    typeMessage = chalk.red.bold(`✖ ${msg}`);
  } else if (type === "progress") {
    typeMessage = chalk.blue.bold(`• ${msg}`);
  }

  return console.log(`${prefix}${typeMessage}`);
};

module.exports = log;
