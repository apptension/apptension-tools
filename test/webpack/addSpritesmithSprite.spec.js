import assert from 'power-assert';
import SpritesmithPlugin from 'webpack-spritesmith';

import addSpritesmithSprite from '../../webpack/addSpritesmithSprite';

describe('addSpritesmithSprite', () => {
  it('should add spritesmith plugin', () => {
    const initialConfig = {plugins: []};
    const config = addSpritesmithSprite({name: 'default'})({
      paths: {sprites: '/sprites', app: '/app', src: '/src'}
    })(initialConfig);
    const [plugin] = config.plugins;

    assert(plugin instanceof SpritesmithPlugin);
  });
});
