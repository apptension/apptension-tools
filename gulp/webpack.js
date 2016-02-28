var _ = require('lodash');
var webpack = require('webpack');
var gutil = require('gulp-util');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var SpritesmithPlugin = require('webpack-spritesmith');
var CopyWebpackPlugin = require('copy-webpack-plugin');

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
        'webpack/hot/dev-server'
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

    var defaultScriptConfig = env.isProduction() ? 'production' : 'development';
    var environment = gutil.env.env || defaultScriptConfig;

    if (env.isProduction()) {
      webpackConfig.devtool = false;
      webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
    }

    webpackConfig.plugins.push(new webpack.DefinePlugin({
      __DEBUG__: !env.isProduction(),
      __CLIENT__: true,
      __SERVER__: false
    }));
    webpackConfig.plugins.push(new CopyWebpackPlugin([
      {from: path.join(pathsConfig.paths.app, pathsConfig.dirNames.public), to: pathsConfig.dirNames.public}
    ]));
    webpackConfig.plugins.push(new SpritesmithPlugin({
      retina: '-2x',
      src: {
        cwd: pathsConfig.paths.sprites,
        glob: '*.png'
      },
      target: {
        image: path.join(pathsConfig.paths.app, pathsConfig.dirNames.images, 'generated', 'sprite.png'),
        css: path.join(pathsConfig.paths.src, '_sprites.scss')
      },
      apiOptions: {
        cssImageRef: '../' + pathsConfig.dirNames.images + '/generated/sprite.png'
      }
    }));
    webpackConfig.plugins.push(new HtmlWebpackPlugin({
      template: path.join(pathsConfig.paths.app, 'index.ejs'),
      inject: 'body',
      environemnt: environment
    }));

    _.set(webpackConfig, 'resolve.alias.env-config', path.join(pathsConfig.paths.environment, environment + '.js'));

    var compiler = webpack(webpackConfig, function (err) {
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
