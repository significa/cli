#!/usr/bin/env node
var inquirer = require("inquirer");
const program = require("commander");

const { version } = require("./package.json");
const create = require("./scripts/create");
const log = require("./scripts/log");

const createGatsby = () => {
  log("1/3: Create new Gatsby project");
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
};

log("Welcome");
program
  .version(version)
  .arguments("<command>")
  .option("gatsby", "create new gatsby project", createGatsby)
  .action(command => {
    log(`Command "$ significa ${command}" not found.`, "error");
  })
  .parse(process.argv);
