var gulp = require('gulp');
var path = require('path');
var gulpif = require('gulp-if');
var _ = require('lodash');
var merge = require('merge-stream');
var spritesmith = require('gulp.spritesmith');

var env = require('./utils/env');
var config = require('./config')();


module.exports = function () {
  var imagesDest = config.paths.tmp;
  var styleDest = config.paths.tmp;

  if (env.isProduction()) {
    imagesDest = config.paths.dist;
  }

  imagesDest = path.join(imagesDest, config.paths.spritesCss);

  var spriteData = gulp.src(config.paths.sprites)
    .pipe(spritesmith({
      imgName: 'sprite.png',
      retinaImgName: 'sprite-retina.png',
      retinaSrcFilter: config.paths.retinaSprites,
      cssName: 'sprites.scss',
      imgPath: '/' + config.paths.spritesCss.replace('\\', '/') + '/sprite.png',
      retinaImgPath: '/' + config.paths.spritesCss.replace('\\', '/') + '/sprite-retina.png'
    }));

  // Pipe image stream through image optimizer and onto disk
  var imgStream = spriteData.img
    .pipe(gulp.dest(imagesDest));

  // Pipe CSS stream through CSS optimizer and onto disk
  var cssStream = spriteData.css
    .pipe(gulp.dest(styleDest));

  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);
};
