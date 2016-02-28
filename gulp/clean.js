var del = require('del');
var config = require('./config');


module.exports = function () {
  var pathsConfig = config.getPathsConfig();

  del.sync([
    pathsConfig.paths.dist
  ]);
};
