var assert = require('power-assert');

var getServerConfig = require('../gulp/config/getServerConfig');


describe('Server config', function () {
  it('should return domain', function () {
    var serverConfig = getServerConfig({});
    assert.ok(serverConfig.domain);
  });

  it('should return port', function () {
    var serverConfig = getServerConfig({});
    assert.ok(serverConfig.port);
  });
});
