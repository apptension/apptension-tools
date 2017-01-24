var gulp = require('gulp');
var sass = require('gulp-sass');
var path = require('path');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');

var _ = require('lodash');

var browserSync = require('./utils/browserSyncInstance');
var config = require('./config');
var env = require('./utils/env');

module.exports = function () {
  var pathsConfig = config.getPathsConfig();
  var sassConfig = config.getSassConfig();
  var cssnanoConfig = config.getCssnanoConfig();
  var autoprefixerConfig = config.getAutoprefixerConfig();

  var sassOptions = _.extend({}, sassConfig, {
    sourceComments: env.isDevelopment()
  });
  var sassCompiler = sass(sassOptions);
  sassCompiler.on('error', sass.logError);
  var autoprefixerCompiler = autoprefixer(autoprefixerConfig);

  var stream = gulp.src(path.join(pathsConfig.paths.app, pathsConfig.filePatterns.styles), {
    base: pathsConfig.paths.app
  })
    .pipe(sassCompiler)
    .pipe(autoprefixerCompiler)
    .pipe(cssnano(cssnanoConfig));

  stream = stream.pipe(gulp.dest(pathsConfig.paths.tmp));

  if (env.isDevelopment()) {
    stream = stream
      .pipe(browserSync.stream());
  }

  return stream;
};
