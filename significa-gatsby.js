const inquirer = require("inquirer");

const createGatsby = require("./scripts/createGatsby");
const log = require("./scripts/log");

(async function() {
  log("1/4: Creating new Gatsby project...");
  inquirer
    .prompt([
      { type: "input", message: "Name:", name: "appName" },
      { type: "input", message: "Description:", name: "appDescription" },
      { type: "input", message: "Author:", name: "appAuthor" },
      { type: "input", message: "URL:", name: "appUrl" },
      {
        type: "list",
        message: "Kind of project:",
        name: "kind",
        choices: ["typescript", "vanilla-react"]
      }
    ])
    .then(args => {
      createGatsby(args);
    });
})();
