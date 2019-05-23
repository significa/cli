const _ = require("lodash");
const fs = require("fs");
const recursive = require("recursive-readdir");

const log = require("./log");

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

async function create(fullPathFolder, args) {
  const files = await recursive(fullPathFolder, [".DS_Store", ".git"]);

  await asyncForEach(files, async file => {
    const fileContent = await fs.readFileSync(file, "utf8");
    try {
      const compiled = _.template(fileContent);
      const metadata = {
        appName: args.appName,
        appDescription: args.appDescription,
        appAuthor: args.appAuthor,
        appUrl: args.appUrl
      };
      try {
        await fs.writeFileSync(file, compiled(metadata));
      } catch (err) {
      }
    } catch (err) {
    }
  });
}

module.exports = create;
