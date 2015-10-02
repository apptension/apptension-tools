var gulp = require('gulp');
var path = require('path');
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
    options.cachebuster = false;
  }

  imagesDest = path.join(imagesDest, config.paths.spritesCss);

  return sprity.src(options)
    .pipe(gulpif('*.png', gulp.dest(imagesDest), gulp.dest(styleDest)));
};
