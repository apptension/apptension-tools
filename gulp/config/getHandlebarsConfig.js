var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var getPathsConfig = require('./getPathsConfig');

module.exports = function (userConfig) {
  var pathsConfig = getPathsConfig(userConfig);


  return _.defaultsDeep(_.get(userConfig, 'handlebars', {}), {
    batch: [
      './' + pathsConfig.dirNames.app + '/' + pathsConfig.dirNames.handlebarsPartials
    ]
  })
};
