var config = require('./config');


module.exports = function (_config) {
  config.setUserConfig(_config);

  return {
    browserSync: require('./browserSync'),
    config: config,
    copyBackend: require('./copyBackend'),
    copyProduction: require('./copyProduction'),
    clean: require('./clean'),
    env: require('./utils/env'),
    eslint: require('./eslint'),
    karma: require('./karma'),
    serverWebpack: require('./serverWebpack'),
    zip: require('./zip')
  };
};
