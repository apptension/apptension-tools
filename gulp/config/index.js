var _ = require('lodash');
var path = require('path');

var userConfig = require('./user');


var cwd = _.get(userConfig, 'paths.cwd', process.cwd());
var dist = path.join(cwd, _.get(userConfig, 'paths.dist', 'dist'));
var app = path.join(cwd, _.get(userConfig, 'paths.app', 'app'));
var tmp = path.join(cwd, _.get(userConfig, 'paths.tmp', '.tmp'));

module.exports = Object.freeze(_.defaultsDeep({
    paths: {
        cwd: cwd,
        dist: dist,
        app: app,
        tmp: tmp
    }
}, userConfig, {
    webpack: {
        entry: path.join(app, 'scripts', 'main.js'),
        output: {
            path: tmp,
            filename: 'scripts/[name].js'
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

    },

    paths: {
        index: path.join(app, 'index.hbs'),
        sass: path.join(app, 'styles', '**/*.scss')
    }
}));
