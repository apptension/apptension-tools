var _ = require('lodash');
var fs = require('fs');
var webpack = require('webpack');
var gutil = require('gulp-util');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var SpritesmithPlugin = require('webpack-spritesmith');
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
    var filename = env.isProduction() ? '[name]-[hash].js' : '[name].js';
    var entry = [path.join(pathsConfig.paths.app, pathsConfig.filePatterns.mainScript)];
    var indexTemplatePath = path.join(pathsConfig.paths.app, 'index.ejs');

    if (!env.isProduction()) {
      entry.unshift(
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://' + serverConfig.domain + ':' + serverConfig.port + '/',
        'webpack/hot/dev-server'
      );
    }

    webpackConfig = _.defaultsDeep({
      devtool: 'eval',
      watch: false
    }, webpackConfig, {
      entry: {
        main: entry
      },
      output: {
        path: pathsConfig.paths.dist,
        filename: filename,
        publicPath: _.get(userConfig, 'webpack.output.publicPath', '/')
      }
    });

    var defaultRuntimeEnv = env.isProduction() ? 'production' : 'development';
    var runtimeEnv = gutil.env.env || defaultRuntimeEnv;

    if (env.isProduction()) {
      webpackConfig.devtool = false;
      webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());

      if (userConfig.generateRevManifest) {
        webpackConfig.plugins.push(new ManifestPlugin({
          fileName: 'rev-manifest.json'
        }));
      }

      webpackConfig.plugins.push(new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }));
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
        image: path.join(pathsConfig.paths.app, 'images', 'generated', 'sprite.png'),
        css: path.join(pathsConfig.paths.src, 'generated', '_sprites.scss')
      },
      apiOptions: {
        cssImageRef: '~images/generated/sprite.png'
      },
      spritesmithOptions: {
        // default binary-tree algorithm has order issues
        algorithm: 'top-down',
        // fix problem with icons overlapping each other using top-down algorithm
        padding: 1
      }
    }));

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
