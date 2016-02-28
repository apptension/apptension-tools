var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var SpritesmithPlugin = require('webpack-spritesmith');
var autoprefixer = require('autoprefixer');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var getPathsConfig = require('./getPathsConfig');

module.exports = function (userConfig) {
  var pathsConfig = getPathsConfig(userConfig);

  var fontNamePath = '/assets/fonts/';
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
      loader: 'url?limit=10000&name=/assets/images/[name]-[hash].png'
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
    new webpack.HotModuleReplacementPlugin(),
    new SpritesmithPlugin({
      retina: '-2x',
      src: {
        cwd: pathsConfig.paths.sprites,
        glob: '*.png'
      },
      target: {
        image: path.join(pathsConfig.paths.app, 'images', 'generated', 'sprite.png'),
        css: path.join(pathsConfig.paths.src, '_sprites.scss')
      },
      apiOptions: {
        cssImageRef: "../images/generated/sprite.png"
      }
    }),
    new CopyWebpackPlugin([
      {from: path.join(pathsConfig.paths.app, pathsConfig.dirNames.public), to: pathsConfig.dirNames.public}
    ])
  ].concat(_.get(userConfig, 'webpack.plugins', []));

  var userWebpackConfig = _.get(userConfig, 'webpack', {});

  return _.defaultsDeep({
    module: {
      loaders: webpackLoaders
    },
    sassLoader: {
      includePaths: [pathsConfig.paths.tmp]
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
    }
  });
};
