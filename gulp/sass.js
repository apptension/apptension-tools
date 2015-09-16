var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var livereload = require('gulp-livereload');
var _ = require('lodash');

var browserSync = require('./utils/browserSyncInstance');
var config = require('./config')();
var env = require('./utils/env');


module.exports = function () {
  var options = _.extend({}, config.sass, {
    sourceComments: env.isDevelopment()
  });
  var sassCompiler = sass(options);
  sassCompiler.on('error', sass.logError);

  var stream = gulp.src(config.paths.sass, {base: config.paths.app})
    .pipe(sassCompiler)
    .pipe(autoprefixer());

  if (env.isProduction()) {
    stream = stream.pipe(minifyCss());
  }

  stream = stream.pipe(gulp.dest(config.paths.tmp));

  if (env.isDevelopment()) {
    stream = stream
      .pipe(livereload())
      .pipe(browserSync.stream());
  }

  return stream;
};
