var _ = require('lodash');
var webpack = require('webpack');
var gutil = require('gulp-util');
var WebpackDevServer = require('webpack-dev-server');

var config = require('./config')();
var env = require('./utils/env');

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

module.exports = function (watch) {
  return function (callback) {
    var webpackConfig = _.defaults({
      devtool: 'eval',
      watch: false
    }, config.webpack, {});

    var webpackDevServerConfig = _.defaults({
      stats: statsOptions
    }, config.webpackDevServer, {});

    webpackConfig.resolve = webpack.resolve || {};

    var jsConfig;
    if (env.isProduction()) {
      webpackConfig.devtool = false;
      webpackConfig.plugins = webpackConfig.plugins.concat([
        new webpack.optimize.UglifyJsPlugin()
      ]);
      jsConfig = config.paths.jsConfig.production;
    } else {
      jsConfig = config.paths.jsConfig.development
    }
    _.set(webpackConfig, 'resolve.alias.env-config', jsConfig);

    var compiler = webpack(webpackConfig, function (err, stats) {
      if (err) {
        throw new gutil.PluginError('webpack', err);
      }
      gutil.log(stats.toString(statsOptions));
      callback();
    });

    if (watch) {
      var server = new WebpackDevServer(compiler, webpackDevServerConfig);
      server.listen(config.port, config.domain);
    }
  };
};
