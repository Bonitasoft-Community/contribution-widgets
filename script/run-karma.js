var path = require('path');
var Karma = require('karma').Server;
var Promise = require('promise');

function getJsAssets(widget) {
  return require(path.join('../src/widgets', widget, 'widget.json'))
    .assets
    .filter(function (asset) {
      return asset.type === 'js';
    })
    .sort(function (a, b) {
      return a.order - b.order;
    })
    .map(function (asset) {
      return path.join('src/widgets', widget, 'assets/js', asset.name);
    });
}

function runKarma(opt, widget) {

  opt.singleRun = !opt.watch;
  opt.autoWatch = opt.watch;
  opt.frameworks = ['jasmine-jquery', 'jasmine'];
  opt.files = [
    'node_modules/angular/angular.js',
    'node_modules/angular-mocks/angular-mocks.js',
    'src/test/runtime.mock.js'
  ]
    .concat(getJsAssets(widget))
    .concat([
      path.join('dist', widget, 'resources/*.js'),
      { pattern: path.join('src/widgets', widget, '**/*.json'),
        watched:  true,
        served:   true,
        included: false },
      path.join('src/widgets', widget, '**/*.spec.js')
    ]);
  opt.browsers = ['PhantomJS'];

  return new Promise(function (resolve, reject) {
    new Karma(opt, function (exitCode) {
      if (exitCode === 0) {
        resolve();
        return;
      }
      reject(exitCode);
    }).start();
  });
}

module.exports = runKarma;
