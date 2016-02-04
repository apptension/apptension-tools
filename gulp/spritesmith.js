var gulp = require('gulp');
var path = require('path');
var merge = require('merge-stream');
var spritesmith = require('gulp.spritesmith');

var env = require('./utils/env');
var config = require('./config');


module.exports = function () {
  var pathsConfig = config.getPathsConfig();

  var imagesDest = pathsConfig.paths.tmp;
  var styleDest = pathsConfig.paths.tmp;

  imagesDest = path.join(imagesDest, pathsConfig.dirNames.images, pathsConfig.dirNames.sprites);

  var spriteData = gulp.src(path.join(pathsConfig.paths.sprites, pathsConfig.filePatterns.sprites))
    .pipe(spritesmith({
      imgName: 'sprite.png',
      retinaImgName: 'sprite-retina.png',
      retinaSrcFilter: path.join(pathsConfig.paths.sprites, pathsConfig.filePatterns.retinaSprites),
      cssName: 'sprites.scss',
      imgPath: '/' + pathsConfig.dirNames.images + '/' + pathsConfig.dirNames.sprites + '/sprite.png',
      retinaImgPath: '/' + pathsConfig.dirNames.images + '/' + pathsConfig.dirNames.sprites + '/sprite-retina.png'
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
