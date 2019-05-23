#!/usr/bin/env node
const program = require("commander");

const { version } = require("./package.json");
const log = require("./scripts/log");

log("Welcome");
program
  .version(version)
  .command("gatsby", "Create new Gatsby project")
  .parse(process.argv);
