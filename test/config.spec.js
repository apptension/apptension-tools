var assert = require('power-assert');

var config = require('../gulp/config');
var getPathsConfig = require('../gulp/config/getPathsConfig');
var getServerConfig = require('../gulp/config/getServerConfig');
var getKarmaConfig = require('../gulp/config/getKarmaConfig');
var getWebpackConfig = require('../gulp/config/getWebpackConfig');
var getRevManifestConfig = require('../gulp/config/getRevManifestConfig');
var getSassConfig = require('../gulp/config/getSassConfig');
var getCssnanoConfig = require('../gulp/config/getCssnanoConfig');
var getWebpackDevServerConfig = require('../gulp/config/getWebpackDevServerConfig');


describe('config', function () {
  it('getPathConfig should return paths config', function () {
    var pathsConfig = config.getPathsConfig();
    var expectedConfig = getPathsConfig();
    assert.ok(pathsConfig);
    assert.deepEqual(pathsConfig, expectedConfig);
  });

  it('getServerConfig should return server config', function () {
    var serverConfig = config.getServerConfig();
    var expectedConfig = getServerConfig();
    assert.ok(serverConfig);
    assert.deepEqual(serverConfig, expectedConfig);
  });

  it('getRevManifest should return rev manifest config', function () {
    var revManifestConfig = config.getRevManifestConfig();
    var expectedConfig = getRevManifestConfig();
    assert.ok(revManifestConfig);
    assert.deepEqual(revManifestConfig, expectedConfig);
  });

  it('getSassConfig should return sass config', function () {
    var sassConfig = config.getSassConfig();
    var expectedConfig = getSassConfig();
    assert.ok(sassConfig);
    assert.deepEqual(sassConfig, expectedConfig);
  });

  it('getCssnanoConfig should return cssnano config', function () {
    var cssnanoConfig = config.getCssnanoConfig();
    var expectedConfig = getCssnanoConfig();
    assert.ok(cssnanoConfig);
    assert.deepEqual(cssnanoConfig, expectedConfig);
  });

  it('getWebpackDevServerConfig should return webpack dev server config', function () {
    var webpackDevServerConfig = config.getWebpackDevServerConfig();
    var expectedConfig = getWebpackDevServerConfig();
    assert.ok(webpackDevServerConfig);
    assert.deepEqual(webpackDevServerConfig, expectedConfig);
  });

  it('getKarmaConfig should return karma config', function () {
    var karmaConfig = config.getKarmaConfig();
    assert.ok(karmaConfig);
  });

  it('getWebpackConfig should return webpack config', function () {
    var webpackConfig = config.getWebpackConfig();
    assert.ok(webpackConfig);
  });
});
