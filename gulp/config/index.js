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

  return Object.freeze(_.defaultsDeep({
    paths: {
      cwd: cwd,
      dist: dist,
      app: app,
      tmp: tmp
    }
  }, _userConfig, {
    webpack: {
      entry: path.join(scripts, 'main.js'),
      output: {
        path: tmp,
        filename: scriptsDirName + '/[name].js'
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

    sass: {},

    paths: {
      index: path.join(app, 'index.hbs'),
      sass: path.join(app, 'styles', '**/*.scss'),
      eslint: scripts + '/**/*.js'
    }
  }));
}

Config.setUserConfig = function (_config) {
  _userConfig = _config;
};

module.exports = Config;
