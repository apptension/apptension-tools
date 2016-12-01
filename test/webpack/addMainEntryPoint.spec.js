import assert from 'power-assert';

import addMainEntryPoint from '../../src/webpack/addMainEntryPoint';

describe('addMainEntryPoint', () => {
  it('should add path to script as an entry point', () => {
    const config = addMainEntryPoint({
      paths: {app: '/app'},
      filePatterns: {mainScript: 'main.js'}
    })({entry: null});

    assert.deepStrictEqual(config.entry, {main: ['/app/main.js']});
  });
});
