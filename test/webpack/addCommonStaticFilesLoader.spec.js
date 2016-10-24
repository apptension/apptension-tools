import assert from 'power-assert';

import addCommonStaticFilesLoader from '../../src/webpack/addCommonStaticFilesLoader';

describe('addCommonStaticFilesLoader', () => {
  it('should add the loader', () => {
    const initialConfig = {module: {loaders: []}};
    const config = addCommonStaticFilesLoader()(initialConfig);
    const [loader] = config.module.loaders;

    assert.equal(loader.test.toString(),
      '/\\\.(png|jpg|gif|ico|woff|woff2|ttf|eot|svg)(\\\?v=\\\d+\\\.\\\d+\\\.\\\d+)?$/');
    assert.equal(loader.loader, 'file');
  });
});
