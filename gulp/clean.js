var del = require('del');
var gutil = require('gulp-util');
var config = require('./config')();


module.exports = function () {
  del.sync([
    config.paths.tmp,
    config.paths.dist
  ]);
};
