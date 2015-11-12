var _ = require('lodash');
var path = require('path');

var getPathsConfig = require('./getPathsConfig');
var getWebpackConfig = require('./getWebpackConfig');


module.exports = function (userConfig) {
  var pathsConfig = getPathsConfig(userConfig);
  var webpackConfig = getWebpackConfig(userConfig);

  var testIndex = path.resolve(pathsConfig.paths.spec, pathsConfig.filePatterns.testIndex);
  var karmaPreprocessors = {};
  karmaPreprocessors[testIndex] = ['webpack', 'sourcemap'];

  var webpackPlugins = webpackConfig.plugins;
  var webpackLoaders = webpackConfig.module.loaders.concat([
    {
      test: /\.jsx?$/,
      include: pathsConfig.paths.src,
      exclude: /.spec.jsx?$/,
      loader: 'isparta'
    }
  ]).concat(_.get(userConfig, 'karma.webpack.module.loaders', []));

  return _.defaultsDeep({
    webpack: {
      module: {
        loaders: webpackLoaders
      },
      plugins: webpackPlugins
    }
  }, _.get(userConfig, 'karma', {}), {
    basePath: '',
    frameworks: ['jasmine'],
    files: [testIndex],
    preprocessors: karmaPreprocessors,
    webpack: {
      devtool: 'eval',
      resolve: {
        alias: {
          vendor_modules: pathsConfig.paths.vendorModules
        }
      }
    },
    webpackMiddleware: {
      stats: {
        colors: true
      }
    },
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    port: 9876,
    colors: true,
    logLevel: 'INFO',
    autoWatch: false,
    browsers: ['PhantomJS'],
    captureTimeout: 60000,
    singleRun: true,
    plugins: [
      require('jasmine'),
      require('karma-webpack'),
      require('karma-coverage'),
      require('karma-jasmine'),
      require('karma-sourcemap-loader'),
      require('karma-spec-reporter'),
      require('karma-chrome-launcher'),
      require('karma-phantomjs-launcher'),
      require('karma-jasmine-matchers')
    ]
  });
};
