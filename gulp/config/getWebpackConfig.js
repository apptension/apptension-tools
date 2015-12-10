var _ = require('lodash');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var getPathsConfig = require('./getPathsConfig');

module.exports = function (userConfig) {
  var pathsConfig = getPathsConfig(userConfig);

  var fontNamePath = pathsConfig.dirNames.public + '/' + pathsConfig.dirNames.fonts;
  var webpackLoaders = [
    {
      test: /\.jsx?$/,
      exclude: /node_modules|bower_components|vendor_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    },
    {
      test: /\.tsx?$/,
      exclude: /node_modules|bower_components|vendor_modules/,
      loader: 'ts-loader'
    },
    {
      test: /\.html$/,
      loader: 'html'
    },
    {
      test: /\.hbs$/,
      loader: 'handlebars'
    },
    {
      test: /\.json$/,
      loader: 'json'
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    },
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/font-woff&name=" + fontNamePath + "/[hash].woff"
    },
    {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/font-woff&name=" + fontNamePath + "/[hash].woff2"
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/octet-stream&name=" + fontNamePath + "/[hash].ttf"
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file?name=" + fontNamePath + "/[hash].eot"
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=image/svg+xml&name=" + fontNamePath + "/[hash].svg"
    }
  ].concat(_.get(userConfig, 'webpack.module.loaders', []));

  var webpackPlugins = [
    new ExtractTextPlugin(pathsConfig.filePatterns.vendorStyles)
  ].concat(_.get(userConfig, 'webpack.plugins', []));

  var userWebpackConfig = _.get(userConfig, 'webpack', {});

  return _.defaultsDeep({
    module: {
      loaders: webpackLoaders
    },
    plugins: webpackPlugins
  }, userWebpackConfig, {
    entry: {
      main: path.join(pathsConfig.paths.src, pathsConfig.filePatterns.mainScript)
    },
    output: {
      path: pathsConfig.paths.tmp,
      filename: pathsConfig.dirNames.src + '/[name].js',
      chunkFilename: pathsConfig.dirNames.src + "/[name].js"
    },
    resolve: {
      extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
      alias: {
        vendor_modules: pathsConfig.paths.vendorModules
      }
    }
  });
};
