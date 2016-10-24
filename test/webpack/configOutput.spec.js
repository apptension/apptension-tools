import assert from 'power-assert';

import {dev, devOptimized, production} from '../../src/env';
import configOutputPath from '../../src/webpack/configOutputPath';

describe('configOutputPath', () => {
  describe('production', () => {
    const env = production();

    it('should add path to script as an entry point', () => {
      const config = configOutputPath({
        publicPath: '/public-path'
      })({
        env,
        paths: {dist: '/dist'}
      })({output: null});

      assert.deepStrictEqual(config.output, {
        path: '/dist',
        filename: '[name]-[hash].js',
        publicPath: '/public-path'
      });
    });
  });

  describe('development', () => {
    const env = dev();

    it('should add path to script as an entry point', () => {
      const config = configOutputPath({
        publicPath: '/public-path'
      })({
        env,
        paths: {dist: '/dist'}
      })({output: null});

      assert.deepStrictEqual(config.output, {
        path: '/dist',
        filename: '[name].js',
        publicPath: '/public-path'
      });
    });
  });

  describe('developmentOptimized', () => {
    const env = devOptimized();

    it('should add path to script as an entry point', () => {
      const config = configOutputPath({
        publicPath: '/public-path'
      })({
        env,
        paths: {dist: '/dist'}
      })({output: null});

      assert.deepStrictEqual(config.output, {
        path: '/dist',
        filename: '[name].js',
        publicPath: '/public-path'
      });
    });
  });
});
