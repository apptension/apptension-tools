import assert from 'power-assert';

import addInlineVendorStylesSupport from '../../src/webpack/addInlineVendorStylesSupport';

describe('addInlineVendorStylesSupport', () => {
  it('should add the loader', () => {
    const initialConfig = {module: {loaders: []}};
    const config = addInlineVendorStylesSupport()(initialConfig);
    const [loader] = config.module.loaders;

    assert.equal(loader.test.toString(), '/\\\.css$/');
    assert.equal(loader.loader, 'style-loader!css-loader?minimize&-autoprefixer!postcss-loader');
  });
});
