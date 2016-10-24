import assert from 'power-assert';
import {find, equals} from 'ramda';

import addBabelSupport from '../../src/webpack/addBabelSupport';

describe('addBabelSupport', () => {
  it('should add babel loader', () => {
    const initialConfig = {module: {loaders: []}};
    const config = addBabelSupport()(initialConfig);
    const [loader] = config.module.loaders;

    assert.equal(loader.test.toString(), '/\\\.jsx?$/');
    assert.equal(loader.loader, 'babel');
  });

  it('should add jsx extension', () => {
    const initialConfig = {resolve: {extensions: []}};
    const config = addBabelSupport()(initialConfig);

    assert(find(equals('.jsx'))(config.resolve.extensions));
  });
});
