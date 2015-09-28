var gulp = require('gulp');
var env = require('./utils/env');
var path = require('path');
var rename = require('gulp-rename');

var config = require('./config')();


module.exports = function () {
  if (env.isDevelopment()) {
    return;
  }

  return gulp.src(config.paths.htaccess)
    .pipe(rename('.htaccess'))
    .pipe(gulp.dest(config.paths.dist));
};
