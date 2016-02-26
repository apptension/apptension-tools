var config = require('./config');


module.exports = function (_config) {
  config.setUserConfig(_config);

  return {
    browserSync: require('./browserSync'),
    clean: require('./clean'),
    config: config,
    compileIndex: require('./compileIndex'),
    copyBackend: require('./copyBackend'),
    copyPublicAssets: require('./copyPublicAssets'),
    env: require('./utils/env'),
    eslint: require('./eslint'),
    images: require('./images'),
    karma: require('./karma'),
    rev: require('./rev'),
    revReplace: require('./revReplace'),
    sass: require('./sass'),
    spritesmith: require('./spritesmith'),
    webpack: require('./webpack'),
    serverWebpack: require('./serverWebpack'),
    copyProduction: require('./copyProduction'),
    zip: require('./zip')
  };
};
