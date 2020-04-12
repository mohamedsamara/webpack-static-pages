/* eslint-disable */
'use strict';

const glob = require('glob');

function getPages() {
  const newPages = [];
  const pages = glob.sync('./src/pages/*');
  pages.forEach(page => {
    newPages.push(
      page
        .split('/')
        .pop()
        .toLowerCase(),
    );
  });
  return newPages;
}

function getEntry() {
  const entry = {
    main: './src/js/index.js',
  };
  const pages = getPages();
  pages.forEach(page => {
    entry[page] = `./src/pages/${page}/index.js`;
  });
  return entry;
}

module.exports = { getPages, getEntry };
