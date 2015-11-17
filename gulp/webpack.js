var _ = require('lodash');
var webpack = require('webpack');
var gutil = require('gulp-util');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');

var config = require('./config');
var env = require('./utils/env');


module.exports = function (watch) {
  var pathsConfig = config.getPathsConfig();
  var serverConfig = config.getServerConfig();
  var webpackConfig = config.getWebpackConfig();
  var webpackDevServerConfig = config.getWebpackDevServerConfig();

  return function (callback) {
    webpackConfig = _.defaults({
      devtool: 'eval',
      watch: false
    }, webpackConfig, {});

    var jsConfig, debug;
    if (env.isProduction()) {
      webpackConfig.devtool = false;
      webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
      debug = false;
    } else {
      debug = true;
    }

    webpackConfig.plugins.push(new webpack.DefinePlugin({
      __DEBUG__: debug
    }));

    if (gutil.env.env) {
      jsConfig = path.join(pathsConfig.paths.environment, gutil.env.env);
    } else {
      if (env.isProduction()) {
        jsConfig = path.join(pathsConfig.paths.environment, pathsConfig.environmentScripts.production);
      } else {
        jsConfig = path.join(pathsConfig.paths.environment, pathsConfig.environmentScripts.development);
      }
    }

    _.set(webpackConfig, 'resolve.alias.env-config', jsConfig);

    var compiler = webpack(webpackConfig, function (err, stats) {
      if (err) {
        throw new gutil.PluginError('webpack', err);
      }
      gutil.log(stats.toString(webpackDevServerConfig.stats));
      callback();
    });

    if (watch) {
      var server = new WebpackDevServer(compiler, webpackDevServerConfig);
      server.listen(serverConfig.port, serverConfig.domain);
    }
  };
};
