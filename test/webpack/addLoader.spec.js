import assert from 'power-assert';

import addLoader from '../../src/webpack/utils/addLoader';

describe('addLoader', () => {
  it('should add the loader', () => {
    const loader = {prop: 'loader'};
    const config = addLoader(loader)()({module: {loaders: []}});

    assert.equal(config.module.loaders[0], loader);
  });
});
