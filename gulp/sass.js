var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var path = require('path');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var _ = require('lodash');

var browserSync = require('./utils/browserSyncInstance');
var config = require('./config');
var env = require('./utils/env');


module.exports = function () {
  var pathsConfig = config.getPathsConfig();
  var sassConfig = config.getSassConfig();

  var options = _.extend({}, sassConfig, {
    sourceComments: env.isDevelopment()
  });
  var sassCompiler = sass(options);
  sassCompiler.on('error', sass.logError);

  var stream = gulp.src(path.join(pathsConfig.paths.app, pathsConfig.filePatterns.styles), {
    base: pathsConfig.paths.app
  })
    .pipe(sassCompiler)
    .pipe(autoprefixer());

  if (env.isProduction()) {
    stream = stream.pipe(minifyCss());
  }

  stream = stream.pipe(gulp.dest(pathsConfig.paths.tmp));

  if (env.isDevelopment()) {
    stream = stream
      .pipe(browserSync.stream());
  }

  return stream;
};
