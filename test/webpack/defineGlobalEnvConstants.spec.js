import assert from 'power-assert';

import {dev, devOptimized, production} from '../../env';
import defineGlobalConstants from '../../webpack/defineGlobalEnvConstants';
import {DefinePlugin} from 'webpack';

describe('defineGlobalConstants', () => {
  describe('production', () => {
    const env = production();

    it('should add DefinePlugin', () => {
      const config = defineGlobalConstants({env})({plugins: []});
      const [plugin] = config.plugins;

      assert(plugin instanceof DefinePlugin);
    });

    it('should add required definitions', () => {
      const config = defineGlobalConstants({env})({plugins: []});
      const [plugin] = config.plugins;

      assert.deepStrictEqual(plugin.definitions, {
        'process.env': {NODE_ENV: '"production"'},
        __DEBUG__: false
      });
    });
  });

  describe('development', () => {
    const env = devOptimized();

    it('should add required definitions', () => {
      const config = defineGlobalConstants({env})({plugins: []});
      const [plugin] = config.plugins;

      assert.deepStrictEqual(plugin.definitions, {
        'process.env': {NODE_ENV: '"production"'},
        __DEBUG__: false
      });
    });
  });

  describe('developmentOptimized', () => {
    const env = dev();

    it('should add required definitions', () => {
      const config = defineGlobalConstants({env})({plugins: []});
      const [plugin] = config.plugins;

      assert.deepStrictEqual(plugin.definitions, {
        'process.env': {NODE_ENV: '"development"'},
        __DEBUG__: true
      });
    });
  });
});
