const Git = require("nodegit");

module.exports = async (kind, pathAppName) => {
  if (kind === "typescript") {
    await Git.Clone(
      "https://github.com/significa/gatsby-starter-typescript",
      `./${pathAppName}`
    );

    messageRepo = `gatsby-starter-typescript`;
  } else {
    await Git.Clone(
      "https://github.com/significa/gatsby-starter-typescript",
      `./${pathAppName}`
    );
  }
};
