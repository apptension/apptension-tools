import assert from 'power-assert';
import {spy} from 'sinon';
import identity from 'lodash/identity';

import configure from '../../webpack/configure';

describe('webpack configure', () => {
  it('should call every middleware with previous result', () => {
    const config = 'config';
    const env = 'env';
    const result1 = 'result-1';
    const result2 = 'result-2';
    const middleware1 = spy(() => result1);
    const middleware2 = spy(() => result2);
    const middleware3 = spy();

    configure(config)([
      middleware1,
      middleware2,
      middleware3
    ])(env);

    assert.ok(middleware1.calledOnce);
    assert.ok(middleware2.calledOnce);
    assert.ok(middleware3.calledOnce);

    assert.deepStrictEqual(middleware1.getCall(0).args, [config, env]);
    assert.deepStrictEqual(middleware2.getCall(0).args, [result1, env]);
    assert.deepStrictEqual(middleware3.getCall(0).args, [result2, env]);
  });

  it('should return value from last middleware', () => {
    const expectedResult = 'expected-result';
    const lastMiddleware = () => expectedResult;

    const result = configure({})([
      identity,
      identity,
      lastMiddleware
    ])({});

    assert.equal(result, expectedResult)
  });
});
