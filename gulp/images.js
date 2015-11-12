var gulp = require('gulp');
var path = require('path');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var config = require('./config');
var env = require('./utils/env');

module.exports = function () {
  var pathsConfig = config.getPathsConfig();
  var stream = gulp.src(path.join(pathsConfig.paths.images, pathsConfig.filePatterns.images), {
    base: pathsConfig.paths.app
  });

  if (env.isProduction()) {
    stream = stream
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
      }))
      .pipe(gulp.dest(pathsConfig.paths.dist));
  } else {
    stream = stream.pipe(gulp.dest(pathsConfig.paths.tmp));
  }

  return stream;
};
