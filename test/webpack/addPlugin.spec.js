import assert from 'power-assert';

import addPlugin from '../../src/webpack/addPlugin';

describe('addPlugin', () => {
  it('should add the plugin', () => {
    const plugin = {prop: 'plugin'};
    const config = addPlugin(plugin)()({plugins: []});

    assert.equal(config.plugins[0], plugin);
  });
});
