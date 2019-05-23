const { execSync } = require("child_process");

module.exports = async (kind, fullPathFolder) => {
  if (kind === "typescript") {
    messageRepo = `gatsby-starter-typescript`;
  } else {
    messageRepo = `gatsby-starter`;
  }

  await execSync(`cd ${fullPathFolder} && rm -rf .git`);
  await execSync(`cd ${fullPathFolder} && git init`);
  await execSync(`cd ${fullPathFolder} && git add .`);
  await execSync(
    `cd ${fullPathFolder} && git commit -am "Initial commit from @significa/${messageRepo}"`
  );
};
