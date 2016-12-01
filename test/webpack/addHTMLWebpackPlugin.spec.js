import assert from 'power-assert';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import addHTMLWebpackPlugin from '../../src/webpack/addHTMLWebpackPlugin';

describe('addHTMLWebpackPlugin', () => {
  it('should add htmlWebpackPlugin plugin', () => {
    const initialConfig = {plugins: []};
    const config = addHTMLWebpackPlugin({
      paths: {app: '/app'}
    })(initialConfig);
    const [plugin] = config.plugins;

    assert(plugin instanceof HtmlWebpackPlugin);
  });

  it('should set filename option', () => {
    const filename = 'filename.html';
    const config = addHTMLWebpackPlugin({
      paths: {app: '/app'},
      htmlPlugin: {filename}
    })({plugins: []});
    const [plugin] = config.plugins;

    assert.equal(plugin.options.filename, filename);
  });
});
