import assert from 'power-assert';
import webpack from 'webpack';

import addUglifyJS from '../../webpack/addUglifyJS';

describe('addUglifyJS', () => {
  it('should add uglifyjs plugin', () => {
    const initialConfig = {plugins: []};
    const config = addUglifyJS()(initialConfig);
    const [plugin] = config.plugins;

    assert(plugin instanceof webpack.optimize.UglifyJsPlugin);
  });
});
