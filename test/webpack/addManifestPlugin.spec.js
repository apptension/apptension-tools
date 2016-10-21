import assert from 'power-assert';
import ManifestPlugin from 'webpack-manifest-plugin';

import addManifestPlugin from '../../webpack/addManifestPlugin';
import {production} from '../../env';

describe('addManifestPlugin', () => {
  const env = production({scriptEnv: 'production'});

  it('should add manifest plugin', () => {
    const config = addManifestPlugin({env})({plugins: []});
    const [plugin] = config.plugins;

    assert(plugin instanceof ManifestPlugin);
  });
});
