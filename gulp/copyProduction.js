var gulp = require('gulp');
var env = require('./utils/env');
var path = require('path');
var _ = require('lodash');
var rename = require('gulp-rename');

var config = require('./config');

module.exports = function () {
  var pathsConfig = config.getPathsConfig();

  var src = _.map(pathsConfig.filePatterns.production, function (filePattern) {
    return path.join(pathsConfig.paths.cwd, filePattern);
  });

  gulp.src(src)
    .pipe(rename(function (path){
      path.basename = path.basename.replace('.production', '');
      path.extname = path.extname.replace('.production', '');
    }))
    .pipe(gulp.dest(pathsConfig.paths.dist));
};
