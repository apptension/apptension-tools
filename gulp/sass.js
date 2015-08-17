var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var path = require('path');
var livereload = require('gulp-livereload');

var browserSync = require('./utils/browserSyncInstance');
var config = require('./config')();

module.exports = function () {
  var compiler = sass(config.sass);

  compiler.on('error', sass.logError);
  gulp.src(config.paths.sass, {base: config.paths.app})
    .pipe(compiler)
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.paths.tmp))
    .pipe(livereload())
    .pipe(browserSync.stream());
};
