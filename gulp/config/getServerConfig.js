var _ = require('lodash');

const defaultPort = 8000;
const defaultDomain = 'localhost';

module.exports = function (userConfig) {
  return {
    port: _.get(userConfig, 'port', defaultPort),
    domain: _.get(userConfig, defaultDomain, defaultDomain)
  }
};
