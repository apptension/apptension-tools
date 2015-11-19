var gulp = require('gulp');
var zip = require('gulp-zip');
var path = require('path');

var config = require('./config');


module.exports = function () {
  var pathsConfig = config.getPathsConfig();

  return gulp.src(path.join(pathsConfig.paths.dist, pathsConfig.filePatterns.zip))
    .pipe(zip(pathsConfig.filePatterns.zipOutput))
    .pipe(gulp.dest(pathsConfig.paths.cwd));
};
