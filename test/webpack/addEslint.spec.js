import assert from 'power-assert';

import addEslint from '../../src/webpack/dev/addEslint';

describe('addTypescriptSupport', () => {
  it('should add typescript preLoader', () => {
    const config = addEslint({paths: {cwd: '/cwd'}})({module: {preLoaders: []}});
    const [loader] = config.module.preLoaders;

    assert.equal(loader.test.toString(), '/\\\.jsx?$/');
    assert.equal(loader.loader, 'eslint-loader');
  });

  it('should add eslint configFile', () => {
    const config = addEslint({paths: {cwd: '/cwd'}})({module: {preLoaders: []}});

    assert.equal(config.eslint.configFile, '/cwd/.eslintrc');
  });
});
