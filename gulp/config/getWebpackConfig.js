var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var getPathsConfig = require('./getPathsConfig');

module.exports = function (userConfig) {
  var pathsConfig = getPathsConfig(userConfig);

  var webpackLoaders = [

  ].concat(_.get(userConfig, 'webpack.module.loaders', []));

  var webpackPlugins = [
    new webpack.HotModuleReplacementPlugin()
  ].concat(_.get(userConfig, 'webpack.plugins', []));

  var userWebpackConfig = _.get(userConfig, 'webpack', {});

  return _.defaultsDeep({
    module: {
      loaders: webpackLoaders
    },
    plugins: webpackPlugins
  }, userWebpackConfig, {
  });
};
