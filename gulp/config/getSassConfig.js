var _ = require('lodash');

var getPathsConfig = require('./getPathsConfig');


module.exports = function (userConfig) {
  var pathsConfig = getPathsConfig(userConfig);
  var sassIncludePaths = _.flattenDeep([
    pathsConfig.paths.tmp
  ].concat(_.get(userConfig, 'sass.includePaths', [])));

  return _.defaultsDeep({
    includePaths: sassIncludePaths
  }, _.get(userConfig, 'sass', {}), {
    noCache: false,
    style: 'compact'
  });
};
