const _ = require("lodash");
const fs = require("fs");
const path = require("path").join;
const Git = require("nodegit");
const recursive = require("recursive-readdir");

const log = require("./log");
const manager = require("./manager");

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
  const { appName, appDescription, appAuthor, appUrl } = args;
  const pathAppName = _.kebabCase(appName);
  const fullPathFolder = path(runPath, appName);

  if (isFolderExistsSync(fullPathFolder)) {
    log(`Folder "${appName}" already exists`, "error");
  } else {
    log(
      `2/3: 🚀  Start cloning "@significa/gatsby-starter" at "${pathAppName}"`,
      "progress"
    );
    await Git.Clone(
      "https://github.com/significa/gatsby-starter",
      `./${pathAppName}`,
      { checkoutBranch: "proposal" }
    );
    log(`2/3: 🚀  The project "${pathAppName}" has been cloned`, "success");

    log(`3/3: 🔍  Renaming the project to "${pathAppName}"`, "progress");
    await recursive(fullPathFolder, [".DS_Store", ".git"], (err, files) => {
      if (!err) {
        files.forEach(file => {
          const fileContent = fs.readFileSync(file, "utf8");
          try {
            const compiled = _.template(fileContent);

            const metadata = {
              appName: appName,
              appDescription: appDescription,
              appAuthor: appAuthor,
              appUrl: appUrl
            };

            try {
              fs.writeFileSync(file, compiled(metadata));
            } catch (err) {
              log(`👎  ${err}`, "error");
            }
          } catch (err) {
            log(`👎  ${err}`, "error");
          }
        });
      }
    });
    log(`3/3: 🔍  The project has been renamed.`, "success");

    log(`

🎉  To get started, run: 
    1. cd ${pathAppName} 
    2. ${cmdInstall}
    3. ${cmdInstall} dev
`);
  }
}

module.exports = create;
