var _ = require('lodash');

var getPathsConfig = require('./getPathsConfig');


module.exports = function (userConfig) {
  return _.defaultsDeep({}, _.get(userConfig, 'cssnano', {}));
};
