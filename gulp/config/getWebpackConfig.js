var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

var getPathsConfig = require('./getPathsConfig');

module.exports = function (userConfig) {
  var pathsConfig = getPathsConfig(userConfig);

  var webpackLoaders = [
    {
      test: /\.jsx?$/,
      exclude: /node_modules|bower_components|vendor_modules/,
      loader: 'babel'
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
      test: /\.json$/,
      loader: 'json'
    },
    {
      test: /\.scss$/,
      loaders: ['style', 'css', 'postcss', 'sass']
    },
    {
      test: /\.css$/,
      loaders: ['style', 'css', 'postcss']
    },
    {
      test: /\.(png|jpg|gif|ico)/,
      loader: 'file?name=[name]-[hash].[ext]'
    },
    {
      test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file?name=[name]-[hash].[ext]"
    }
  ].concat(_.get(userConfig, 'webpack.module.loaders', []));

  var webpackPlugins = [
    new webpack.HotModuleReplacementPlugin()
  ].concat(_.get(userConfig, 'webpack.plugins', []));

  var userWebpackConfig = _.get(userConfig, 'webpack', {});

  return _.defaultsDeep({
    module: {
      loaders: webpackLoaders
    },
    postcss: function () {
      return [autoprefixer];
    },
    plugins: webpackPlugins,
    node: {
      fs: 'empty'
    }
  }, userWebpackConfig, {
    resolve: {
      extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
      alias: {
        vendor_modules: pathsConfig.paths.vendorModules
      }
    },
    node: {
      __dirname: true,
      fs: "empty",
      net: "empty",
      tls: "empty",
      dns: "empty"
    },
    browser: {
      __dirname: true,
      fs: "empty",
      net: "empty",
      tls: "empty",
      dns: "empty"
    }
  });
};
