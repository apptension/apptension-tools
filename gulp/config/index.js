var _ = require('lodash');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var getPathsConfig = require('./getPathsConfig');
var getServerConfig = require('./getServerConfig');
var getKarmaConfig = require('./getKarmaConfig');
var getWebpackConfig = require('./getWebpackConfig');
var getRevManifestConfig = require('./getRevManifestConfig');
var getSassConfig = require('./getSassConfig');
var getWebpackDevServerConfig = require('./getWebpackDevServerConfig');


var _userConfig = {};

module.exports = {};

module.exports.setUserConfig = function (_config) {
  _userConfig = _config;
};

module.exports.getPathsConfig = function () {
  return getPathsConfig(_userConfig);
};

module.exports.getServerConfig = function () {
  return getServerConfig(_userConfig)
};

module.exports.getKarmaConfig = function () {
  return getKarmaConfig(_userConfig)
};

module.exports.getWebpackConfig = function () {
  return getWebpackConfig(_userConfig)
};

module.exports.getRevManifestConfig = function () {
  return getRevManifestConfig(_userConfig)
};

module.exports.getSassConfig = function () {
  return getSassConfig(_userConfig)
};

module.exports.getWebpackDevServerConfig = function () {
  return getWebpackDevServerConfig(_userConfig)
};

Object.defineProperty(module.exports, 'watchPaths', {
  get: function () {
    var pathsConfig = getPathsConfig(_userConfig);

    return {
      index: path.join(pathsConfig.paths.app, pathsConfig.filePatterns.index),
      sass: path.join(pathsConfig.paths.app, pathsConfig.filePatterns.styles),
      eslint: path.join(pathsConfig.paths.eslint, pathsConfig.filePatterns.eslint),
      sprites: path.join(pathsConfig.paths.sprites, pathsConfig.filePatterns.sprites),
      images: path.join(pathsConfig.paths.images, pathsConfig.filePatterns.images),
      public: path.join(pathsConfig.paths.public, pathsConfig.filePatterns.public)
    };
  }
});
