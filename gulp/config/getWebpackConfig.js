var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var getPathsConfig = require('./getPathsConfig');

module.exports = function (userConfig) {
  var pathsConfig = getPathsConfig(userConfig);


  var webpackLoaders = [
    {
      test: /\.json$/,
      loader: 'json'
    },
    {
      test: /\.ejs$/i,
      loader: 'underscore-template-loader',
      query: {
        parseDynamicRoutes: true,
        attributes: [
          'img:src',
          'link:href'
        ]
      }
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
      return [autoprefixer({browsers: ['last 2 versions', 'last 3 iOS versions', 'not ie <= 8']})];
    },
    plugins: webpackPlugins
  }, userWebpackConfig, {
  });
};
