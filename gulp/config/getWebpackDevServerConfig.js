var _ = require('lodash');
var gutil = require('gulp-util');

var getPathsConfig = require('./getPathsConfig');

var statsOptions = {
  colors: gutil.colors.supportsColor,
  hash: false,
  timings: false,
  chunks: false,
  chunkModules: false,
  modules: false,
  children: true,
  version: true,
  cached: false,
  cachedAssets: false,
  reasons: false,
  source: false,
  errorDetails: false
};

module.exports = function (userConfig) {
  var pathsConfig = getPathsConfig(userConfig);

  return _.defaultsDeep(_.get(userConfig, 'webpackDevServer', {}), {
    contentBase: pathsConfig.paths.tmp,
    proxy: {
      '/api/*': 'http://localhost:8080'
    },
    stats: statsOptions
  });
};
