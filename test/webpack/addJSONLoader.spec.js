import assert from 'power-assert';

import addJSONLoader from '../../webpack/addJSONLoader';

describe('addJSONLoader', () => {
  it('should add the loader', () => {
    const initialConfig = {module: {loaders: []}};
    const config = addJSONLoader()(initialConfig);
    const [loader] = config.module.loaders;

    assert.equal(loader.test.toString(), '/\\\.json$/');
    assert.equal(loader.loader, 'json');
  });
});
