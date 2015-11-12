var karma = require('karma');
var _ = require('lodash');
var path = require('path');

var config = require('./config');


module.exports = function (watch) {
  var pathsConfig = config.getPathsConfig();
  var karmaConfig = config.getKarmaConfig();

  return function (callback) {
    var options = _.defaults({
      autoWatch: watch,
      singleRun: !watch
    }, karmaConfig);

    _.set(options, 'webpack.resolve.alias.env-config',
      path.join(pathsConfig.paths.environment, pathsConfig.environmentScripts.test));

    var server = new karma.Server(options, function (exitCode) {
      if (exitCode) {
        callback('Karma has exited with ' + exitCode);
      } else {
        callback();
      }
    });

    server.start();
  };
};
