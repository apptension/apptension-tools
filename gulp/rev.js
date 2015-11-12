var gulp = require('gulp');
var rev = require('gulp-rev');
var env = require('./utils/env');

var config = require('./config');

module.exports = function () {
  var pathsConfig = config.getPathsConfig();
  var revManifestConfig = config.getRevManifestConfig();

  if (!env.isProduction()) {
    return;
  }

  return gulp.src(pathsConfig.filePatterns.rev, {cwd: pathsConfig.paths.tmp})
    .pipe(rev())
    .pipe(gulp.dest(pathsConfig.paths.dist))
    .pipe(rev.manifest(revManifestConfig))
    .pipe(gulp.dest(pathsConfig.paths.tmp));
};
