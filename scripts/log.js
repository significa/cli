const chalk = require("chalk");

const log = (msg, type) => {
  const prefix = chalk.blue.bold("@significa/cli ");
  let typeMessage = chalk.blue.bold(`➜ ${msg}`);

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
