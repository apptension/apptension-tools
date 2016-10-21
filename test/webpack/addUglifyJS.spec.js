import assert from 'power-assert';
import {find, propEq, equals} from 'ramda';
import webpack from 'webpack';

import addUglifyJS from '../../webpack/addUglifyJS';

describe('addExtractedSassSupport', () => {
  it('should add uglifyjs plugin', () => {
    const initialConfig = {plugins: []};
    const config = addUglifyJS()(initialConfig);
    const [plugin] = config.plugins;

    assert(plugin instanceof webpack.optimize.UglifyJsPlugin);
  });
});
