var _ = require('lodash');
var fs = require('fs');
var webpack = require('webpack');
var gutil = require('gulp-util');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var SpritesmithPlugin = require('webpack-spritesmith');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ManifestRevisionPlugin = require('manifest-revision-webpack-plugin');

var config = require('./config');
var env = require('./utils/env');


module.exports = function (watch) {
  var pathsConfig = config.getPathsConfig();
  var serverConfig = config.getServerConfig();
  var webpackConfig = config.getWebpackConfig();
  var webpackDevServerConfig = config.getWebpackDevServerConfig();

  return function (callback) {
    var filename = env.isProduction() ? '/assets/scripts/[name]-[hash].js' : '[name].js';
    var entry = [path.join(pathsConfig.paths.app, pathsConfig.filePatterns.mainScript)];
    var indexTemplatePath = path.join(pathsConfig.paths.app, 'index.ejs');

    if (!env.isProduction()) {
      entry.unshift(
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
        filename: filename
      }
    });

    var defaultRuntimeEnv = env.isProduction() ? 'production' : 'development';
    var runtimeEnv = gutil.env.env || defaultRuntimeEnv;

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
    webpackConfig.plugins.push(new ManifestRevisionPlugin(path.join(pathsConfig.paths.dist, 'rev-manifest.json'), {
      rootAssetPath: pathsConfig.paths.app
    }));

    try {
      fs.accessSync(indexTemplatePath, fs.F_OK);
      webpackConfig.plugins.push(new HtmlWebpackPlugin({
        template: indexTemplatePath,
        inject: 'body',
        environemnt: runtimeEnv,
        debug: !env.isProduction()
      }));
    } catch (e) {
    }

    _.set(webpackConfig, 'resolve.alias.env-config', path.join(pathsConfig.paths.environment, runtimeEnv + '.js'));

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
