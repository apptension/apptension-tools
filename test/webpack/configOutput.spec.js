import assert from 'power-assert';

import configOutputPath from '../../src/webpack/configOutputPath';

describe('configOutputPath', () => {
  it('should configure output path', () => {
    const config = configOutputPath({
      output: {
        publicPath: '/public-path',
        filename: '[name]-[hash].js'
      },
      paths: {dist: '/dist'}
    })({output: null});

    assert.deepStrictEqual(config.output, {
      path: '/dist',
      filename: '[name]-[hash].js',
      publicPath: '/public-path'
    });
  });

  it('should set default output', () => {
    const config = configOutputPath({
      paths: {dist: '/dist'}
    })({output: null});

    assert.deepStrictEqual(config.output, {
      path: '/dist',
      filename: '[name].js',
      publicPath: '/'
    });
  });
});
