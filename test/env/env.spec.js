import assert from 'power-assert';

import {dev, devOptimized, production} from '../../env/index';

describe('env', () => {
  const testEnv = (env, envName) => {
    describe(envName, () => {
      it(`should set envName property to ${envName}`, () => {
        assert.equal(env({}).envName, envName)
      });
    });
  };

  testEnv(dev, 'development');
  testEnv(devOptimized, 'development-optimized');
  testEnv(production, 'production');
});
