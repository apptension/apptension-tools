var path = require('path');
var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');

var browserSync = require('./utils/browserSyncInstance');
var env = require('./utils/env');

var config = require('./config')();

module.exports = function () {
  var handlebarOpts = {
    helpers: {
      assetPath: function (path, context) {
        if (env.isProduction()) {
          return context.data.root.manifest[path];
        }
        return path;
      }
    }
  };
  var manifest;
  var manifestPath = path.join(config.paths.tmp, 'rev-manifest.json');
  try {
    var manifestStats = fs.statSync(manifestPath);
    if (manifestStats.isFile()) {
      manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    }
  } catch (ignore) {
  }

  var stream = gulp.src(config.paths.index)
    .pipe(handlebars({
      manifest: manifest,
      development: !env.isProduction()
    }, handlebarOpts))
    .pipe(rename('index.html'));

  if (env.isProduction()) {
    stream = stream.pipe(gulp.dest(config.paths.dist));
  } else {
    stream = stream.pipe(gulp.dest(config.paths.tmp));
  }

  return stream.pipe(livereload()).pipe(browserSync.stream());
};
