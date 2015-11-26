var gulp = require('gulp');
var env = require('./utils/env');
var path = require('path');

var config = require('./config');

module.exports = function () {
  var pathsConfig = config.getPathsConfig();

  return gulp.src(path.join(pathsConfig.paths.public, pathsConfig.filePatterns.public))
    .pipe(gulp.dest(path.join(pathsConfig.paths.tmp, pathsConfig.dirNames.public)));
};
