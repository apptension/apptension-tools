var del = require('del');
var gutil = require('gulp-util');
var config = require('./config');


module.exports = function () {
  var pathsConfig = config.getPathsConfig();

  del.sync([
    pathsConfig.paths.tmp,
    pathsConfig.paths.dist
  ]);
};
