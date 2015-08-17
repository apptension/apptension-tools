var browserSync = require('./utils/browserSyncInstance');
var config = require('./config')();
var env = require('./utils/env');


module.exports = function () {
  if (env.isProduction()) {
    browserSync.init({
      server: {
        baseDir: config.paths.dist
      }
    });
  } else {
    browserSync.init({
      proxy: config.domain + ':' + config.port,
      ws: true
    });
  }
};
