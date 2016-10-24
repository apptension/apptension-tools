import assert from 'power-assert';

import {dev, devOptimized, production, ENV_DEV, ENV_DEV_OPTIMIZED, ENV_PROD} from '../../env/index';

describe('env', () => {
  const testEnv = (env, envName) => {
    describe(envName, () => {
      it(`should set envName property to ${envName}`, () => {
        assert.equal(env({}).envName, envName);
      });
    });
  };

  testEnv(dev, ENV_DEV);
  testEnv(devOptimized, ENV_DEV_OPTIMIZED);
  testEnv(production, ENV_PROD);
});
