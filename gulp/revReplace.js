var gulp = require('gulp');
var path = require('path');
var revReplace = require('gulp-rev-replace');

var env = require('./utils/env');
var config = require('./config');


module.exports = function () {
  var pathsConfig = config.getPathsConfig();
  var manifest = gulp.src(path.join(pathsConfig.paths.tmp, pathsConfig.filePatterns.revManifest));

  if (!env.isProduction()) {
    return;
  }

  return gulp.src(pathsConfig.filePatterns.revReplace, {cwd: pathsConfig.paths.dist})
    .pipe(revReplace({
      manifest: manifest,
      replaceInExtensions: ['.js', '.css', '.html', '.hbs', '.json'],
      modifyUnreved: replaceJsIfMap,
      modifyReved: replaceJsIfMap
    }))
    .pipe(gulp.dest(pathsConfig.paths.dist));

  function replaceJsIfMap(filename) {
    if (filename.indexOf('.map') !== -1) {
      return filename.replace(pathsConfig.dirNames.src + '/', '');
    }
    return filename;
  }
};