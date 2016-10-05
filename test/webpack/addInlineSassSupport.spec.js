import assert from 'power-assert';
import {find, propEq, equals} from 'ramda';

import addInlineSassSupport from '../../webpack/addInlineSassSupport';

describe('addInlineSassSupport', () => {
  it('should add the loader', () => {
    const initialConfig = {module: {loaders: []}};
    const config = addInlineSassSupport()(initialConfig);
    const [loader] = config.module.loaders;

    assert.equal(loader.test.toString(), '/\\\.scss$/');
    assert.equal(loader.loader, 'style-loader!css-loader?minimize&-autoprefixer!postcss-loader!sass-loader');
  });
});
