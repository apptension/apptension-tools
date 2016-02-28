var _ = require('lodash');
var webpack = require('webpack');
var gutil = require('gulp-util');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = require('./config');
var env = require('./utils/env');


module.exports = function (watch) {
  var pathsConfig = config.getPathsConfig();
  var serverConfig = config.getServerConfig();
  var webpackConfig = config.getWebpackConfig();
  var webpackDevServerConfig = config.getWebpackDevServerConfig();

  return function (callback) {
    var filename = env.isProduction() ? '/assets/scripts/[name]-[hash].js' : '[name].js';
    var entry = [path.join(pathsConfig.paths.src, pathsConfig.filePatterns.mainScript)];

    if (!env.isProduction()) {
      entry.unshift(
        'webpack-dev-server/client?http://' + serverConfig.domain + ':' + serverConfig.port + '/',
        "webpack/hot/dev-server"
      );
    }

    webpackConfig = _.defaults({
      devtool: 'eval',
      watch: false
    }, webpackConfig, {
      entry: {
        main: entry
      },
      output: {
        path: pathsConfig.paths.dist,
        filename: filename
      }
    });

    var jsConfig, debug = true, environment;
    if (env.isProduction()) {
      webpackConfig.devtool = false;
      webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
      debug = false;
    }

    if (gutil.env.env) {
      jsConfig = path.join(pathsConfig.paths.environment, gutil.env.env);
      environment = gutil.env.env;
    } else {
      if (env.isProduction()) {
        jsConfig = path.join(pathsConfig.paths.environment, pathsConfig.environmentScripts.production);
        environment = 'production';
      } else {
        jsConfig = path.join(pathsConfig.paths.environment, pathsConfig.environmentScripts.development);
        environment = 'development';
      }
    }

    webpackConfig.plugins.push(new webpack.DefinePlugin({__DEBUG__: debug, __CLIENT__: true, __SERVER__: false}));
    webpackConfig.plugins.push(new HtmlWebpackPlugin({
      template: path.join(pathsConfig.paths.app, 'index.ejs'),
      inject: 'body',
      environemnt: environment
    }));

    _.set(webpackConfig, 'resolve.alias.env-config', jsConfig);

    var compiler = webpack(webpackConfig, function (err, stats) {
      if (err) {
        throw new gutil.PluginError('webpack', err);
      }
      callback();
    });

    if (watch) {
      var server = new WebpackDevServer(compiler, webpackDevServerConfig);
      server.listen(serverConfig.port, serverConfig.domain);
    }
  };
};
