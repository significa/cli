const _ = require("lodash");

const fs = require("fs");
const path = require("path").join;
const runPath = process.cwd();
const log = require("./log");
const Git = require("nodegit");
const recursive = require("recursive-readdir");
const { exec } = require("child_process");

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
      `1/3: 🚀  Start cloning "@significa/gatsby-typescript-boilerplate" at "${pathAppName}"`,
      "progress"
    );
    await Git.Clone(
      "https://github.com/significa/gatsby-typescript-boilerplate",
      `./${pathAppName}`,
      { checkoutBranch: "proposal" }
    );
    log(`1/3: 🚀  The project "${pathAppName}" has been cloned`, "success");

    log(`2/3: 🔍  Renaming the project to "${pathAppName}"`, "progress");
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
    log(`2/3: 🔍  The project has been renamed.`, "success");

    log(`3/3: 🔗  Installing dependencies.`, "progress");

    const process = exec(`cd ${pathAppName} && npm install`);
    process.stdout.on("data", data => {
      console.log(data);
    });

    process.on("exit", code => {
      log(`3/3: 🔗  Dependencies has been installed.`, "success");

      log(`🎉  To get started, run: "cd ${pathAppName} && npm run dev"`);
    });
  }
}

module.exports = create;
