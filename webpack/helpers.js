const glob = require("glob");

function getPageNames() {
  const newPages = [];
  const pages = glob.sync("./src/pages/*");
  pages.forEach(page => {
    newPages.push(
      page
        .split("/")
        .pop()
        .toLowerCase()
    );
  });
  return newPages;
}

function getEntry() {
  const entry = {};
  const pages = getPageNames();
  pages.forEach(page => {
    entry[page] = `./src/pages/${page}/index.js`;
  });
  return entry;
}

module.exports = { getPageNames, getEntry };
