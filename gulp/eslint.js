var gulp = require('gulp');
var eslint = require('gulp-eslint');

var config = require('./config')();


module.exports = function () {
  return gulp.src(config.paths.eslint)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
};
