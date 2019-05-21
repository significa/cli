#!/usr/bin/env node

const program = require("commander");
const create = require("./scripts/create");
const log = require("./scripts/log");
const { version } = require("./package.json");

let appName;

program
  .version(version)
  .arguments("<appName>")
  .option("-v, --version", "version")
  .action(_appName => {
    appName = _appName;
  })
  .parse(process.argv);

if (appName) {
  create(appName);
} else {
  log("Please, choose a name for your project.");
}
