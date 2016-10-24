import assert from 'power-assert';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import addHTMLWebpackPlugin from '../../src/webpack/addHTMLWebpackPlugin';
import {production} from '../../src/env';

describe('addHTMLWebpackPlugin', () => {
  const env = production({scriptEnv: 'production'});

  it('should add htmlWebpackPlugin plugin', () => {
    const initialConfig = {plugins: []};
    const config = addHTMLWebpackPlugin()({
      env,
      paths: {app: '/app'}
    })(initialConfig);
    const [plugin] = config.plugins;

    assert(plugin instanceof HtmlWebpackPlugin);
  });
});
