const _ = require("lodash");
const path = require("path").join;

const log = require("./log");
const manager = require("./manager");
const cloneGatsby = require("./cloneGatsby");
const createRepo = require("./createRepo");
const renameVars = require("./renameVars");

const runPath = process.cwd();
const managerType = manager();
const cmdRun = managerType === "yarn" ? "yarn" : "npm run";
const cmdInstall = managerType === "yarn" ? "yarn" : "npm install";

_.templateSettings = {
  evaluate: /{{([\s\S]+?)}}/g,
  interpolate: /{{=([\s\S]+?)}}/g,
  escape: /{{-([\s\S]+?)}}/g
};

const isFolderExistsSync = dir => {
  try {
    fs.accessSync(dir);
    return true;
  } catch (e) {
    return false;
  }
};

async function create(args) {
  const { appName, kind } = args;
  const pathAppName = _.kebabCase(appName);
  const fullPathFolder = path(runPath, appName);

  if (isFolderExistsSync(fullPathFolder)) {
    log(`Folder "${appName}" already exists`, "error");
  } else {
    log(`2/4: Creating a new Gatsby app at "${fullPathFolder}"`, "success");
    await cloneGatsby(kind, pathAppName);

    log(`3/4: Renaming the project to "${pathAppName}"`, "success");
    await renameVars(fullPathFolder, args);

    log(`4/4: Initializing a git repository`, "success");
    await createRepo(kind, fullPathFolder);

    log(`

🎉   To get started, run: 
    1. cd ${pathAppName} 
    2. ${cmdInstall}
    3. ${cmdRun} dev
`);
  }
}

module.exports = create;
