var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var getPathsConfig = require('./getPathsConfig');

module.exports = function (userConfig) {
  var pathsConfig = getPathsConfig(userConfig);

  var extractVendorCSSPlugin, extractSASSPlugin;
  var scssLoader = {test: /\.scss$/};
  var vendorCssLoader = {test: /\.css$/};

  if (userConfig.extractCSS) {
    extractSASSPlugin = new ExtractTextPlugin('styles.css', {allChunks: true});
    extractVendorCSSPlugin = new ExtractTextPlugin('vendor.css', {allChunks: true});
    scssLoader.loader = extractSASSPlugin.extract('style-loader', ['css-loader?minimize&-autoprefixer', 'postcss-loader', 'sass-loader']);
    vendorCssLoader.loader = extractSASSPlugin.extract('style-loader', ['css-loader?minimize&-autoprefixer']);
  } else {
    scssLoader.loaders = ['style-loader', 'css-loader?minimize&-autoprefixer', 'postcss-loader', 'sass-loader'];
    vendorCssLoader.loaders = ['style-loader', 'css-loader?minimize&-autoprefixer', 'postcss-loader'];
  }

  var webpackLoaders = [
    {
      test: /\.tsx?$/,
      exclude: /node_modules|bower_components|vendor_modules/,
      loader: 'ts-loader'
    },
    {
      test: /\.json$/,
      loader: 'json'
    },
    scssLoader,
    vendorCssLoader,
    {
      test: /\.(png|jpg|gif|ico)/,
      loader: 'file?name=[name]-[hash].[ext]'
    },
    {
      test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file?name=[name]-[hash].[ext]"
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

  if (extractSASSPlugin) {
    webpackPlugins.push(extractSASSPlugin);
  }

  if (extractVendorCSSPlugin) {
    webpackPlugins.push(extractVendorCSSPlugin);
  }

  var userWebpackConfig = _.get(userConfig, 'webpack', {});

  return _.defaultsDeep({
    module: {
      loaders: webpackLoaders
    },
    postcss: function () {
      return [autoprefixer({browsers: ['last 2 versions', 'last 3 iOS versions', 'not ie <= 8']})];
    },
    plugins: webpackPlugins,
    node: {
      fs: 'empty'
    }
  }, userWebpackConfig, {
    resolve: {
      extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
    }
  });
};
