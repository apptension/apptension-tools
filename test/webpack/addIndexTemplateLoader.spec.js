import assert from 'power-assert';
import {find, propEq, equals} from 'ramda';

import addIndexTemplateLoader from '../../webpack/addIndexTemplateLoader';

describe('addIndexTemplateLoader', () => {
  it('should add the loader', () => {
    const initialConfig = {module: {loaders: []}};
    const config = addIndexTemplateLoader()(initialConfig);
    const [loader] = config.module.loaders;

    assert.equal(loader.test.toString(), '/\\\.ejs$/i');
    assert.equal(loader.loader, 'underscore-template-loader');
  });
});
