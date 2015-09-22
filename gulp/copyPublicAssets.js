var gulp = require('gulp');
var env = require('./utils/env');
var path = require('path');

var config = require('./config')();

module.exports = function () {
  var dest = env.isDevelopment() ? config.paths.tmp : config.paths.dist;
  return gulp.src(config.paths.publicAssets)
    .pipe(gulp.dest(path.join(dest, 'public')));
};
