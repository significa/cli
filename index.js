#!/usr/bin/env node
const create = require("./scripts/create");
const log = require("./scripts/log");

var inquirer = require("inquirer");
log("Welcome");
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
    create(args);
  });
