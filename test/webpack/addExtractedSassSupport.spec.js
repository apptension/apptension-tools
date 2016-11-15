import assert from 'power-assert';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import addExtractedSassSupport from '../../src/webpack/addExtractedSassSupport';

describe('addExtractedSassSupport', () => {
  it('should add sass loader', () => {
    const initialConfig = {module: {loaders: []}};
    const config = addExtractedSassSupport()(initialConfig);
    const [loader] = config.module.loaders;

    assert.equal(loader.test.toString(), '/\\\.scss$/');
  });

  it('should add plugin', () => {
    const initialConfig = {plugins: []};
    const config = addExtractedSassSupport()(initialConfig);
    const [plugin] = config.plugins;

    assert(plugin instanceof ExtractTextPlugin);
  });

  it('should set proper filename', () => {
    const initialConfig = {plugins: []};
    const config = addExtractedSassSupport()(initialConfig);
    const [plugin] = config.plugins;

    assert.equal(plugin.filename, 'styles-[contenthash].css');
  });
});
