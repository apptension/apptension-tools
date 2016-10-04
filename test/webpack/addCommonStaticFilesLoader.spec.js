import assert from 'power-assert';
import {find, propEq, equals} from 'ramda';

import addCommonStaticFilesLoader from '../../webpack/addCommonStaticFilesLoader';

describe('addCommonStaticFilesLoader', () => {
  it('should add the loader', () => {
    const initialConfig = {module: {loaders: []}};
    const config = addCommonStaticFilesLoader()(initialConfig);

    assert(find(propEq('loader', 'file'))(config.module.loaders));
  });
});
