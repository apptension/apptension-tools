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
  var autoprefixerConfig = config.getAutoprefixerConfig();

  var sassOptions = _.extend({}, sassConfig, {
    sourceComments: env.isDevelopment()
  });
  var sassCompiler = sass(sassOptions);
  sassCompiler.on('error', sass.logError);

  var stream = gulp.src(path.join(pathsConfig.paths.app, pathsConfig.filePatterns.styles), {
    base: pathsConfig.paths.app
  })
    .pipe(sassCompiler);

  if (env.isDevelopment()) {
    var autoprefixerCompiler = autoprefixer(autoprefixerConfig);

    stream = stream
      .pipe(autoprefixerCompiler);
  } else {
    var cssnanoConfig = config.getCssnanoConfig();

    cssnanoConfig.autoprefixer = _.extend({}, autoprefixerConfig);

    stream = stream
      .pipe(cssnano(cssnanoConfig));
  }

  stream = stream.pipe(gulp.dest(pathsConfig.paths.tmp));

  if (env.isDevelopment()) {
    stream = stream
      .pipe(browserSync.stream());
  }

  return stream;
};
