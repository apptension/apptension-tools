var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');

var browserSync = require('./utils/browserSyncInstance');
var config = require('./config')();
var env = require('./utils/env');


module.exports = function () {
  var sassCompiler = sass(config.sass);
  sassCompiler.on('error', sass.logError);

  var stream = gulp.src(config.paths.sass, {base: config.paths.app})
    .pipe(sassCompiler)
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.paths.tmp));

  if (env.isDevelopment()) {
    stream = stream
      .pipe(livereload())
      .pipe(browserSync.stream({match: '**/*.css'}));
  }

  return stream;
};
