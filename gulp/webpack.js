var _ = require('lodash');
var webpack = require('webpack');
var gutil = require('gulp-util');
var WebpackDevServer = require("webpack-dev-server");

var config = require('./config');

var statsOptions = {
    colors: gutil.colors.supportsColor,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: true,
    version: true,
    cached: false,
    cachedAssets: false,
    reasons: false,
    source: false,
    errorDetails: false
};

module.exports = function (watch) {
    return function (callback) {
        var webpackConfig = _.defaults({}, config.webpack, {});
        var webpackDevServerConfig = _.defaults({
            stats: statsOptions
        }, config.webpackDevServer, {});
        var compiler = webpack(webpackConfig, function (err, stats) {
            if (err) {
                throw new gutil.PluginError("webpack", err);
            }
            gutil.log(stats.toString(statsOptions));
            callback();
        });

        if (watch) {
            var server = new WebpackDevServer(compiler, webpackDevServerConfig);
            server.listen(config.port, config.domain);
        }
    };
};
