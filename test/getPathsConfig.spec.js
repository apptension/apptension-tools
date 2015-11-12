var assert = require('power-assert');
var path = require('path');

var getPathsConfig = require('../gulp/config/getPathsConfig');


describe('Paths config', function () {
  describe('dirNames property', function () {
    it('should have dist defined', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.dirNames.dist);
    });

    it('should have app defined', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.dirNames.app);
    });

    it('should have tmp defined', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.dirNames.tmp);
    });

    it('should have public defined', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.dirNames.public);
    });

    it('should have src defined', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.dirNames.src);
    });

    it('should have sprites defined', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.dirNames.sprites);
    });

    it('should have images defined', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.dirNames.images);
    });

    it('should have environment defined', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.dirNames.environment);
    });

    it('should have backend defined', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.dirNames.backend);
    });

    it('should have vendorModules defined', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.dirNames.vendorModules);
    });

    it('should have fonts defined', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.dirNames.fonts);
    });

    it('should have spec defined', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.dirNames.spec);
    });
  });

  describe('paths property', function () {
    it('should have cwd defined', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.paths.cwd);
    });

    it('should have src defined', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.paths.src);
    });

    it('should have sprites defined', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.paths.sprites);
    });

    it('should have eslint defined', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.paths.eslint);
    });

    it('should have public defined', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.paths.public);
    });

    it('should have tmp defined', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.paths.tmp);
    });

    it('should have dist defined', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.paths.dist);
    });

    it('should have images defined', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.paths.images);
    });

    it('should have app defined', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.paths.app);
    });

    it('should have vendorModules defined', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.paths.vendorModules);
    });

    it('should have spec defined', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.paths.spec);
    });

    it('should have environment defined', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.paths.environment);
    });
  });

  describe('filePatterns property', function () {
    it('should have sprites', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.filePatterns.sprites);
    });

    it('should have retinaSprites', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.filePatterns.retinaSprites);
    });

    it('should have testIndex', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.filePatterns.testIndex);
    });

    it('should have eslint', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.filePatterns.eslint);
    });

    it('should have index', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.filePatterns.index);
    });

    it('should have images', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.filePatterns.images);
    });

    it('should have styles', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.filePatterns.styles);
    });

    it('should have revManifest', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.filePatterns.revManifest);
    });

    it('should have vendorStyles', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.filePatterns.vendorStyles);
    });

    it('should have mainScript', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.filePatterns.mainScript);
    });

    it('should have rev', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.filePatterns.rev);
    });

    it('should have public', function () {
      var pathsConfig = getPathsConfig({});
      assert.ok(pathsConfig.filePatterns.public);
    });
  });

  it('should override cwd with user config', function () {
    var userConfig = {
      paths: {cwd: '/user/specified/cwd'}
    };
    var pathsConfig = getPathsConfig(userConfig);
    assert.equal(pathsConfig.paths.cwd, userConfig.paths.cwd);
  });
});
