import assert from 'power-assert';

import copyDirectory from '../../webpack/copyDirectory';

describe('copyDirectory', () => {
  it('should add CopyWebpackPlugin', () => {
    const config = copyDirectory('public')({
      paths: {app: '/app'}
    })({plugins: []});

    assert(config.plugins.length);
  });
});
