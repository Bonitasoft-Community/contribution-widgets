var Writable = require('stream').Writable;
var fs = require('fs');
var gutil = require('gulp-util');
var request = require('request');

function logDeploymentResult(err, body) {

  if (err) {
    gutil.log(gutil.colors.red('Failed to deploy widget [', err.code, ']'));
    return;
  }

  var widget = JSON.parse(body);
  if (widget.status !== 'imported') {
    gutil.log(gutil.colors.red('Failed to deploy widget \'' + gutil.colors.cyan(widget.element.name) + '\' reason :' + widget.status));
    gutil.log(gutil.colors.red('Try to force update using --force option if reason is \'conflict\'.'));
    return;
  }

  gutil.log('Deployed \'' + gutil.colors.cyan(widget.element.name) + '\'');
}

function deploy(host, force) {

  var stream = new Writable({objectMode: true});
  stream._write = function (file, encoding, callback) {

    request.post({
      uri: host + '/import/widget',
      qs: {
        force: force
      },
      formData: {
        file: fs.createReadStream(file.path)
      }
    }, function (err, resp, body) {
      logDeploymentResult(err, body);
      callback();
    });
  };
  return stream;
}

module.exports = deploy;
