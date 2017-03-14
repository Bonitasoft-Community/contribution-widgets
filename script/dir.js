var fs = require('fs');
var path = require('path');

function dir(dir) {
  return fs.readdirSync(dir)
    .filter(function (file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

module.exports = dir;
