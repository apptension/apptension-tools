import assert from 'power-assert';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import addHTMLWebpackPlugin from '../../webpack/addHTMLWebpackPlugin';
import {production} from '../../env';

describe('addExtractedSassSupport', () => {
  const env = production({scriptEnv: 'production'});

  it('should add spritesmith plugin', () => {
    const initialConfig = {plugins: []};
    const config = addHTMLWebpackPlugin()({
      env,
      paths: {app: '/app'}
    })(initialConfig);
    const [plugin] = config.plugins;

    assert(plugin instanceof HtmlWebpackPlugin);
  });
});
