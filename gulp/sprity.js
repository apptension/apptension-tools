var gulp = require('gulp');
var path = require('path');
var merge = require('merge-stream');
var gulpif = require('gulp-if');
var sprity = require('sprity');
var env = require('./utils/env');

var config = require('./config')();


module.exports = function () {
  var imagesDest = config.paths.tmp;
  var styleDest = config.paths.tmp;

  if (env.isProduction()) {
    imagesDest = config.paths.dist;
  }

  return sprity.src(config.sprity)
    .pipe(gulpif('*.png', gulp.dest(path.join(imagesDest, config.paths.spritesCss)), gulp.dest(styleDest)));
};
