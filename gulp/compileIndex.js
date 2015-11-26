var path = require('path');
var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');

var browserSync = require('./utils/browserSyncInstance');
var env = require('./utils/env');

var config = require('./config');

module.exports = function () {
  var pathsConfig = config.getPathsConfig();

  var manifest;
  var manifestPath = path.join(pathsConfig.paths.tmp, pathsConfig.filePatterns.revManifest);
  try {
    var manifestStats = fs.statSync(manifestPath);
    if (manifestStats.isFile()) {
      manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    }
  } catch (ignore) {
  }

  var stream = gulp.src(path.join(pathsConfig.paths.app, pathsConfig.filePatterns.index))
    .pipe(handlebars({
      manifest: manifest,
      development: !env.isProduction()
    }))
    .pipe(rename({extname: '.html'}));

  if (env.isProduction()) {
    stream = stream.pipe(gulp.dest(pathsConfig.paths.dist));
  } else {
    stream = stream.pipe(gulp.dest(pathsConfig.paths.tmp));
  }

  return stream.pipe(browserSync.stream());
};
