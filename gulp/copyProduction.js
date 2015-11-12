var gulp = require('gulp');
var env = require('./utils/env');
var debug = require('gulp-debug');
var path = require('path');
var _ = require('lodash');
var gutil = require('gulp-util');

var config = require('./config');

module.exports = function () {
  var pathsConfig = config.getPathsConfig();

  var src = _.map(pathsConfig.filePatterns.production, function (filePattern) {
    return path.join(pathsConfig.paths.cwd, filePattern);
  });

  gulp.src(src)
    .pipe(debug({title: 'copyProd'}))
    .pipe(gulp.dest(pathsConfig.paths.dist));
};
