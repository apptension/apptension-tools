var karma = require('karma');
var _ = require('lodash');

var config = require('./config')();


module.exports = function (watch) {
  return function (callback) {
    var options = _.defaults({
      autoWatch: watch,
      singleRun: !watch
    }, config.karma);

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
