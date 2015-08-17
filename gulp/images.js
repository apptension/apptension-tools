var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var config = require('./config')();
var env = require('./utils/env');

module.exports = function () {
  var stream = gulp.src(config.paths.images, {base: config.paths.app});

  if (env.isProduction()) {
    stream = stream
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
      }))
      .pipe(gulp.dest(config.paths.dist));
  } else {
    stream = stream.pipe(gulp.dest(config.paths.tmp));
  }

  return stream;
};
