var gulp = require('gulp');
var env = require('./utils/env');
var path = require('path');

var config = require('./config')();

module.exports = function () {
  if (env.isDevelopment()) {
    return;
  }

  gulp.src([config.paths.backend])
    .pipe(gulp.dest(config.paths.dist));
};
