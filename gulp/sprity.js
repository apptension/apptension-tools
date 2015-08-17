var gulp = require('gulp');
var path = require('path');
var merge = require('merge-stream');
var gulpif = require('gulp-if');
var sprity = require('sprity');
var env = require('./utils/env');
var _ = require('lodash');

var config = require('./config')();


module.exports = function () {
  var imagesDest = config.paths.tmp;
  var styleDest = config.paths.tmp;
  var options = _.cloneDeep(config.sprity);

  if (env.isProduction()) {
    imagesDest = config.paths.dist;
    options.cachebuster = true;
  }

  return sprity.src(options)
    .pipe(gulpif('*.png', gulp.dest(path.join(imagesDest, config.paths.spritesCss)), gulp.dest(styleDest)));
};
