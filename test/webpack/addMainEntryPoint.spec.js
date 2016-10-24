import assert from 'power-assert';

import {dev, devOptimized, production} from '../../src/env';
import addMainEntryPoint from '../../src/webpack/addMainEntryPoint';

describe('addMainEntryPoint', () => {
  describe('production', () => {
    const env = production();

    it('should add path to script as an entry point', () => {
      const config = addMainEntryPoint({
        env,
        paths: {app: '/app'},
        filePatterns: {mainScript: 'main.js'}
      })({entry: null});

      assert.deepStrictEqual(config.entry, {main: ['/app/main.js']});
    });
  });

  describe('development', () => {
    const env = dev();

    it('should add path to script as an entry point', () => {
      const config = addMainEntryPoint({
        env,
        paths: {app: '/app'},
        filePatterns: {mainScript: 'main.js'}
      })({entry: null});

      assert.deepStrictEqual(config.entry, {main: ['/app/main.js']});
    });
  });

  describe('developmentOptimized', () => {
    const env = devOptimized();

    it('should add path to script as an entry point', () => {
      const config = addMainEntryPoint({
        env,
        paths: {app: '/app'},
        filePatterns: {mainScript: 'main.js'}
      })({entry: null});

      assert.deepStrictEqual(config.entry, {main: ['/app/main.js']});
    });
  });
});
