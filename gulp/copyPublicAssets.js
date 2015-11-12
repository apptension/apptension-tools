var gulp = require('gulp');
var env = require('./utils/env');
var path = require('path');
var merge = require('merge-stream');

var config = require('./config');

module.exports = function () {
  var pathsConfig = config.getPathsConfig();
  var dest = env.isDevelopment() ? pathsConfig.paths.tmp : pathsConfig.paths.dist;

  var src = [path.join(pathsConfig.paths.public, pathsConfig.filePatterns.public)];

  if (env.isProduction()) {
    src = src.concat([
      path.join(pathsConfig.paths.tmp, pathsConfig.dirNames.public, pathsConfig.filePatterns.public)
    ]);
  }

  gulp.src(src)
    .pipe(gulp.dest(path.join(dest, pathsConfig.dirNames.public)));

};
