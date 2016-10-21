import assert from 'power-assert';

import addDevtool from '../../webpack/addDevtool';

describe('addDevtool', () => {
  it('should set devtool property to eval as default', () => {
    const config = addDevtool()()({});

    assert.equal(config.devtool, 'eval');
  });

  it('should set devtool property to specified value', () => {
    const devtool = 'specified-value';
    const config = addDevtool(devtool)()({});

    assert.equal(config.devtool, devtool);
  });
});
