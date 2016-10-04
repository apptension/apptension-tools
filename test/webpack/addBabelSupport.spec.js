import assert from 'power-assert';
import {find, propEq, equals} from 'ramda';

import addBabelSupport from '../../webpack/addBabelSupport';

describe('addBabelSupport', () => {
  it('should add babel loader', () => {
    const initialConfig = {module: {loaders: []}};
    const config = addBabelSupport()(initialConfig);

    assert(find(propEq('loader', 'babel'))(config.module.loaders));
  });

  it('should add jsx extension', () => {
    const initialConfig = {resolve: {extensions: []}};
    const config = addBabelSupport()(initialConfig);

    assert(find(equals('.jsx'))(config.resolve.extensions));
  });
});
