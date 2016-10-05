import assert from 'power-assert';
import {find, propEq, equals} from 'ramda';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import addExtractedVendorStylesSupport from '../../webpack/addExtractedVendorStylesSupport';

describe('addExtractedVendorStylesSupport', () => {
  it('should add sass loader', () => {
    const initialConfig = {module: {loaders: []}};
    const config = addExtractedVendorStylesSupport()(initialConfig);
    const [loader] = config.module.loaders;

    assert.equal(loader.test.toString(), '/\\\.css$/');
  });

  it('should add plugin', () => {
    const initialConfig = {plugins: []};
    const config = addExtractedVendorStylesSupport()(initialConfig);
    const [plugin] = config.plugins;

    assert(plugin instanceof ExtractTextPlugin);
    assert.equal(plugin.filename, 'vendor.css');
  });

  it('should set proper filename', () => {
    const initialConfig = {plugins: []};
    const config = addExtractedVendorStylesSupport()(initialConfig);
    const [plugin] = config.plugins;

    assert.equal(plugin.filename, 'vendor.css');
  });
});
