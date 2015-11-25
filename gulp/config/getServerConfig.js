var _ = require('lodash');

const defaultPort = 8000;
const defaultDomain = '0.0.0.0';

module.exports = function (userConfig) {
  return {
    port: _.get(userConfig, 'port', defaultPort),
    domain: _.get(userConfig, 'domain', defaultDomain)
  }
};
