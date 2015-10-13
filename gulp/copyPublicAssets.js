var gulp = require('gulp');
var env = require('./utils/env');
var path = require('path');
var merge = require('merge-stream');

var config = require('./config')();

module.exports = function () {
  var dest = env.isDevelopment() ? config.paths.tmp : config.paths.dist;

  var src = [config.paths.publicAssets];

  if (env.isProduction()) {
    src = src.concat([
      path.join(config.paths.tmp, 'public/**/*')
    ]);
  }

  gulp.src(src)
    .pipe(gulp.dest(path.join(dest, 'public')));

};
