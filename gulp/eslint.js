var gulp = require('gulp');
var eslint = require('gulp-eslint');
var path = require('path');

var config = require('./config');


module.exports = function () {
  var pathsConfig = config.getPathsConfig();

  return gulp.src(path.join(pathsConfig.paths.eslint, pathsConfig.filePatterns.eslint))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
};
