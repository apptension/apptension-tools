var gulp = require('gulp');
var rev = require('gulp-rev');
var merge = require('gulp-merge');

var env = require('./utils/env');
var config = require('./config');


module.exports = function () {
  var pathsConfig = config.getPathsConfig();
  var revConfig = config.getRevManifestConfig();

  if (!env.isProduction()) {
    return;
  }

  var stream = gulp.src(pathsConfig.filePatterns.rev, {cwd: pathsConfig.paths.tmp});
  if (revConfig.enabled) {
    stream = stream.pipe(rev())
  }
  stream = stream.pipe(gulp.dest(pathsConfig.paths.dist));

  if (revConfig.enabled) {
    stream = stream.pipe(rev.manifest(revConfig.manifest));
  }

  return stream.pipe(gulp.dest(pathsConfig.paths.tmp));
};
