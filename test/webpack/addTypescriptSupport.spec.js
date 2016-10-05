import assert from 'power-assert';
import {find, propEq, equals} from 'ramda';

import addTypeScriptSupport from '../../webpack/addTypeScriptSupport';

describe('addTypescriptSupport', () => {
  it('should add typescript loader', () => {
    const initialConfig = {module: {loaders: []}};
    const config = addTypeScriptSupport()(initialConfig);
    const [loader] = config.module.loaders;

    assert.equal(loader.test.toString(), '/\\\.tsx?$/');
    assert.equal(loader.loader, 'ts-loader');
  });

  it('should add ts extension', () => {
    const initialConfig = {resolve: {extensions: []}};
    const config = addTypeScriptSupport()(initialConfig);

    assert(find(equals('.ts'))(config.resolve.extensions));
  });

  it('should add tsx extension', () => {
    const initialConfig = {resolve: {extensions: []}};
    const config = addTypeScriptSupport()(initialConfig);

    assert(find(equals('.tsx'))(config.resolve.extensions));
  });
});
