var browserSync = require('./utils/browserSyncInstance');
var config = require('./config');
var env = require('./utils/env');


module.exports = function () {
  var pathsConfig = config.getPathsConfig();
  var serverConfig = config.getServerConfig();

  if (env.isProduction()) {
    browserSync.init({
      server: {
        baseDir: pathsConfig.paths.dist,
        port: 8081
      }
    });
  } else {
    browserSync.init({
      proxy: serverConfig.domain + ':' + serverConfig.port,
      ws: true,
      ui: false
    });
  }
};
