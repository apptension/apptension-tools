import assert from 'power-assert';
import {spy} from 'sinon';
import identity from 'lodash/identity';

import applyEvolutions from '../../src/webpack/internal/applyEvolutions';

describe('webpack applyEvolutions', () => {
  it('should call every middleware with previous result', () => {
    const config = 'config';
    const env = 'env';
    const result1 = 'result-1';
    const result2 = 'result-2';
    const middleware1 = spy(() => result1);
    const middleware2 = spy(() => result2);
    const middleware3 = spy(() => ({}));

    applyEvolutions(
      () => middleware3,
      () => middleware2,
      () => middleware1
    )(env)(config);

    assert.ok(middleware1.calledOnce);
    assert.ok(middleware2.calledOnce);
    assert.ok(middleware3.calledOnce);

    assert.deepEqual(middleware1.getCall(0).args, [config]);
    assert.deepEqual(middleware2.getCall(0).args, [result1]);
    assert.deepEqual(middleware3.getCall(0).args, [result2]);
  });

  it('should return value from last middleware', () => {
    const env = 'env';
    const expectedResult = 'expected-result';
    const lastMiddleware = ({config, env}) => expectedResult;

    assert.deepEqual(applyEvolutions(
      () => lastMiddleware,
      () => identity,
      () => identity
    )(env)({}), expectedResult);
  });
});
