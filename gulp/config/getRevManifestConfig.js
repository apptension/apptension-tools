var _ = require('lodash');

module.exports = function (userConfig) {
  return _.defaultsDeep(_.get(userConfig, 'rev', {}), {
    enabled: true,

    manifest: {
      merge: false
    }
  });
};
