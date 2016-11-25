var _ = require('lodash');


module.exports = function (userConfig) {
  return _.defaultsDeep({}, _.get(userConfig, 'autoprefixer', {}));
};
