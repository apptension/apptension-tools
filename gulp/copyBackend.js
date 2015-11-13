var gulp = require('gulp');
var env = require('./utils/env');
var path = require('path');
var gutil = require('gulp-util');
var config = require('./config');

module.exports = function () {
  var pathsConfig = config.getPathsConfig();
  if (env.isDevelopment()) {
    gutil.log('Skipping copy backend task in development env.');
    return;
  }

  gulp.src([path.join(pathsConfig.paths.backend, pathsConfig.filePatterns.backend)])
    .pipe(gulp.dest(path.join(pathsConfig.paths.dist, pathsConfig.dirNames.backend)));
};
