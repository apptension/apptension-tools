import assert from 'power-assert';

import addEnvConfigScriptAlias from '../../src/webpack/addEnvConfigAlias';

describe('addEnvConfigScriptAlias', () => {
  it('should add env-config alias', () => {
    const envConfigName = 'production';
    const paths = {environment: '/environment'};
    const config = addEnvConfigScriptAlias({paths, envConfigName})({resolve: {alias: {}}});

    assert.equal(config.resolve.alias['env-config'], `${paths.environment}/${envConfigName}.js`);
  });

  it('should set development as alias by default', () => {
    const paths = {environment: '/environment'};
    const config = addEnvConfigScriptAlias({paths})({resolve: {alias: {}}});

    assert.equal(config.resolve.alias['env-config'], `${paths.environment}/development.js`);
  });
});
