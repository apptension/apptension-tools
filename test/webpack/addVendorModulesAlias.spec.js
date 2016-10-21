import assert from 'power-assert';

import addVendorModulesAlias from '../../webpack/addVendorModulesAlias';

describe('addVendorModulesAlias', () => {
  it('should define vendor_modules in alias object', () => {
    const vendorModulesPath = '/vendor-modules/path.js';
    const config = addVendorModulesAlias({paths: {vendorModules: vendorModulesPath}})({resolve: {alias: {}}});

    assert.equal(config.resolve.alias.vendor_modules, vendorModulesPath);
  });

  it('should keep other aliases', () => {
    const otherAlias = '/value.js';
    const config = addVendorModulesAlias({paths: {vendorModules: 'path'}})({resolve: {alias: {
      otherAlias: otherAlias
    }}});

    assert.equal(config.resolve.alias.otherAlias, otherAlias);
  });
});
