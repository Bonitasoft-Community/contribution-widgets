var gulp = require('gulp');
var zip = require('gulp-zip');
var join = require('path').join;
var merge = require('merge-stream');
var Promise = require('promise');
var yargs = require('yargs');
var clean = require('gulp-clean');
var rename = require('gulp-rename');

var buildWidget = require('widget-builder');

var runKarma = require('./script/run-karma');
var dir = require('./script/dir');
var deploy = require('./script/deploy');

gulp.task('clean', function() {
  return gulp.src('dist').pipe(clean());
});

gulp.task('build', function() {
  return merge(dir('src/widgets').map(function(widget) {
    return merge(
        gulp.src(join('src/widgets', widget, '*.json')).pipe(buildWidget()),
        gulp.src(join('src/widgets', widget, 'assets/**/*')).pipe(rename(function(path) {
          path.dirname = join(widget, 'assets', path.dirname);
        })))
      .pipe(gulp.dest(join('dist', widget, 'resources')));
  }));
});

gulp.task('deployAll', ['zip'], function() {
  var argv = getDeploymentAllArguments();
  return dir('dist').map(function(widget) {
    return gulp.src(join('dist', widget + '.zip')).pipe(deploy(argv.host, argv.force));
  });
});

gulp.task('test', ['build'], function(done) {
  let watch = yargs.argv.watch;
  if (watch) {
    gulp.watch('src/widgets/**/(!*.spec.js)', ['build']);
  }
  Promise
    .all(dir('src/widgets').map(runKarma.bind(null, {
      watch
    })))
    .then(done.bind(null, null));
});

gulp.task('zip', ['build'], function() {
  return merge(dir('dist').map(function(widget) {
    return gulp.src(join('dist', widget, '**/*'))
      .pipe(zip(widget + '.zip'))
      .pipe(gulp.dest('dist'));
  }));
});

gulp.task('deploy:single', ['zip'], function() {
  var argv = getDeploymentArguments();
  return gulp.src(join('dist', argv.widget + '.zip')).pipe(deploy(argv.host, argv.force));
});

gulp.task('deploy:watch', ['deploy:single'], function() {
  var argv = getDeploymentArguments();
  return gulp.watch(join('src/widgets', argv.widget, '**/*'), ['deploy:single']);
});

gulp.task('deploy', function() {
  return yargs.argv.watch ? gulp.start('deploy:watch') : gulp.start('deploy:single');
});

gulp.task('default', ['clean'], function() {
  return gulp.start(['test', 'zip']);
});

function getDeploymentArguments() {
  //console.log(sing)
  return yargs
    .usage('Usage: npm run deploy -- --widget customWidget [--host http://127.0.0.1:8080/designer] [--force] [--watch]')

    .demand('widget')
    .alias('widget', 'w')
    .choices('widget', dir('dist'))
    .describe('widget', 'Widget directory name to deploy')

    .demand('host', false)
    .alias('host', 'h')
    .default('host', 'http://127.0.0.1:8080/designer')
    .describe('host', 'UI Designer URL')

    .demand('force', false)
    .alias('force', 'f')
    .default('force', false)
    .describe('force', 'Override the widget if it already exist at destination')

    .demand('watch', false)
    .default('watch', false)
    .describe('watch', 'Watch source files and redeploy widget whenever a source file changes')

    .argv;
}

function getDeploymentAllArguments(singleWidget) {

  return yargs
    .usage('Usage: npm run deployAll -- [--host http://127.0.0.1:8080/designer] [--force] ')

    .demand('host', false)
    .alias('host', 'h')
    .default('host', 'http://127.0.0.1:8080/designer')
    .describe('host', 'UI Designer URL')

    .demand('force', false)
    .alias('force', 'f')
    .default('force', false)
    .describe('force', 'Override the widget if it already exist at destination')

    .argv;
}
