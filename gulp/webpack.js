var _ = require('lodash');
var fs = require('fs');
var webpack = require('webpack');
var gutil = require('gulp-util');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');

var config = require('./config');
var env = require('./utils/env');


module.exports = function (watch) {
  var pathsConfig = config.getPathsConfig();
  var serverConfig = config.getServerConfig();
  var webpackConfig = config.getWebpackConfig();
  var webpackDevServerConfig = config.getWebpackDevServerConfig();
  var userConfig = config.getUserConfig();

  return function (callback) {
    var indexTemplatePath = path.join(pathsConfig.paths.app, 'index.ejs');

    webpackConfig = _.defaultsDeep({
      devtool: 'eval',
      watch: false
    }, webpackConfig);

    var defaultRuntimeEnv = env.isProduction() ? 'production' : 'development';
    var runtimeEnv = gutil.env.env || defaultRuntimeEnv;

    if (env.isProduction()) {
      webpackConfig.devtool = false;

      if (userConfig.generateRevManifest) {
        webpackConfig.plugins.push(new ManifestPlugin({
          fileName: 'rev-manifest.json'
        }));
      }
    }

    webpackConfig.plugins.push(new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false
    }));
    webpackConfig.plugins.push(new CopyWebpackPlugin([
      {from: path.join(pathsConfig.paths.app, pathsConfig.dirNames.public), to: pathsConfig.dirNames.public}
    ]));

    try {
      fs.accessSync(indexTemplatePath, fs.F_OK);
      webpackConfig.plugins.push(new HtmlWebpackPlugin(_.assign({
        template: indexTemplatePath,
        inject: 'body',
        environment: runtimeEnv,
        debug: !env.isProduction()
      }, _.get(userConfig, 'htmlExtraOptions', {}))));
    } catch (e) {
    }

    _.set(webpackConfig, 'resolve.alias.env-config', path.join(pathsConfig.paths.environment, runtimeEnv + '.js'));
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
