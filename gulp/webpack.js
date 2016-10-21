var _ = require('lodash');
var webpack = require('webpack');
var gutil = require('gulp-util');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var config = require('./config');


module.exports = function (watch) {
  var pathsConfig = config.getPathsConfig();
  var serverConfig = config.getServerConfig();
  var webpackConfig = config.getWebpackConfig();
  var webpackDevServerConfig = config.getWebpackDevServerConfig();

  return function (callback) {
    webpackConfig.plugins.push(new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false
    }));

    webpackConfig.plugins.push(new CopyWebpackPlugin([
      {from: path.join(pathsConfig.paths.app, pathsConfig.dirNames.public), to: pathsConfig.dirNames.public}
    ]));

    _.set(webpackConfig, 'resolve.modulesDirectories', [
      'node_modules',
      'web_modules',
      _.get(config.getUserConfig(), 'paths.app', 'app')
    ]);

    var compiler = webpack(webpackConfig, function (err, stats) {
      if (err) {
        throw new gutil.PluginError('webpack', err);
      }
      gutil.log(stats.toString(webpackDevServerConfig.stats));

      if (stats.hasErrors()) {
        process.exit(1);
      }

      callback(err);
    });

    if (watch) {
      var server = new WebpackDevServer(compiler, webpackDevServerConfig);
      server.listen(serverConfig.port, serverConfig.domain);
    }
  };
};
