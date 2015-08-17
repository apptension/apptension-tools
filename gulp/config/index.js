var _ = require('lodash');
var path = require('path');

var _userConfig;

function Config() {
  var cwd = _.get(_userConfig, 'paths.cwd', process.cwd());
  var dist = path.join(cwd, _.get(_userConfig, 'paths.dist', 'dist'));
  var app = path.join(cwd, _.get(_userConfig, 'paths.app', 'app'));
  var tmp = path.join(cwd, _.get(_userConfig, 'paths.tmp', '.tmp'));
  var scriptsDirName = 'scripts';
  var scripts = path.join(app, scriptsDirName);
  var imagesDirName = 'images';
  var spritesDirName = 'sprites';
  var sprites = path.join(app, imagesDirName, spritesDirName, '**/*.png');
  var spritesCssPath = path.join(imagesDirName, spritesDirName);

  return Object.freeze(_.defaultsDeep({
    sprity: {
      src: sprites,
      cssPath: '/' + spritesCssPath
    },
    paths: {
      cwd: cwd,
      dist: dist,
      app: app,
      tmp: tmp,
      sass: path.join(app, 'styles', '**/*.scss'),
      sprity: sprites,
      spritesCss: spritesCssPath,
      eslint: scripts + '/**/*.js',
      index: path.join(app, 'index.hbs'),
      images: [
        path.join(app, imagesDirName, '**/*.{png,jpg,gif,svg}'),
        '!' + sprites
      ]
    }
  }, _userConfig, {
    webpack: {
      entry: path.join(scripts, 'main.js'),
      output: {
        path: tmp,
        filename: scriptsDirName + '/[name].js'
      },
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules|bower_components/,
            loader: 'babel'
          },
          {
            test: /\.html$/,
            loader: 'html'
          },
          {
            test: /\.hbs$/,
            loader: 'handlebars'
          }
        ]
      }
    },

    webpackDevServer: {
      contentBase: tmp
    },

    port: 8000,
    domain: 'localhost',

    revManifest: {
      merge: false
    },

    sass: {
      includePaths: [tmp]
    },

    sprity: {
      style: 'sprites.scss',
      processor: 'sass',
      'style-type': 'scss',
      dimension: [{
        ratio: 1, dpi: 72
      }, {
        ratio: 2, dpi: 192
      }],
      prefix: 'icon',
      split: true
    }
  }));
}

Config.setUserConfig = function (_config) {
  _userConfig = _config;
};

module.exports = Config;
