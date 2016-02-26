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
    webpackConfig = _.defaultsDeep({
      cache:   false,
      context: __dirname,
      devtool: 'eval',
      watch: false,
      target:  'node'
    }, webpackConfig, {
      entry: {
        server: path.join(pathsConfig.paths.src, pathsConfig.filePatterns.serverScript)
      },
      output: {
        path: pathsConfig.paths.dist,
        filename: pathsConfig.dirNames.src + '/[name].js',
        chunkFilename: pathsConfig.dirNames.src + "/[name].js"
      },
      node: {
        __dirname: true,
        fs: "empty",
        net: "empty",
        tls: "empty"
      },
      module: {
        noParse: /node_modules\/json-schema\/lib\/validate\.js/
      }
    });

    var jsConfig, debug = true;
    if (env.isProduction()) {
      webpackConfig.devtool = false;
      debug = false;
    }

    webpackConfig.plugins.push(new webpack.DefinePlugin({__DEBUG__: debug, __CLIENT__: false, __SERVER__: true}));

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
      compiler.watch({}, function (err, stats) {
        if (err) {
          throw new gutil.PluginError('webpack', err);
        }
        gutil.log(stats.toString(webpackDevServerConfig.stats));
      })
    }
  };
};
