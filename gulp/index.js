var config = require('./config');


module.exports = function (_config) {
  config.setUserConfig(_config);

  return {
    browserSync: require('./browserSync'),
    clean: require('./clean'),
    config: config(),
    compileIndex: require('./compileIndex'),
    env: require('./utils/env'),
    eslint: require('./eslint'),
    images: require('./images'),
    livereload: require('./livereload'),
    rev: require('./rev'),
    sass: require('./sass'),
    sprity: require('./sprity'),
    webpack: require('./webpack')
  };
};
