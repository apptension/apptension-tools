import assert from 'power-assert';

import defineAlias from '../../webpack/defineAlias';

describe('defineAlias', () => {
  it('should define alias with specified name nad path', () => {
    const name = 'someAlias';
    const path = '/path/script.js';
    const config = defineAlias(name, path)()({resolve: {alias: {}}});

    assert.equal(config.resolve.alias[name], path);
  });

  it('should keep other aliases', () => {
    const otherAlias = '/value.js';
    const config = defineAlias('someAlias', 'path')()({
      resolve: {
        alias: {
          otherAlias: otherAlias
        }
      }
    });

    assert.equal(config.resolve.alias.otherAlias, otherAlias);
  });
});
