import assert from 'power-assert';

import configPostcss from '../../src/webpack/configPostcss';

describe('configPostcss', () => {
  it('should add the loader', () => {
    const initialConfig = {};
    const config = configPostcss()(initialConfig);
    const [autoprefixer] = config.postcss();

    assert.deepStrictEqual(autoprefixer.options, {
      browsers: ['last 2 versions', 'last 3 iOS versions', 'not ie <= 8']
    });
  });
});
