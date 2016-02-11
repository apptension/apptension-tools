var _ = require('lodash');
var path = require('path');


module.exports = function (userConfig) {
  var dirNames = {
    dist: 'dist',
    app: 'app',
    tmp: '.tmp',
    public: 'public',
    src: 'src',
    sprites: 'sprites',
    images: 'images',
    environment: 'environment',
    backend: 'backend',
    vendorModules: 'vendor_modules',
    fonts: 'fonts',
    spec: 'spec',
    handlebarsPartials: 'hbs-partials'
  };

  var filePatterns = {
    backend: '**/*',
    sprites: '*.png',
    retinaSprites: '*-2x.png',
    testIndex: 'test.index.js',
    eslint: '**/*.js',
    index: '*.hbs',
    indexWatch: '**/*.hbs',
    images: '*.{png,jpg,gif,svg,ico}',
    styles: '**/*.scss',
    revManifest: 'rev-manifest.json',
    vendorStyles: 'vendor-styles.css',
    mainScript: 'main.js',
    public: '**/*',
    production: [
      '.*.production',
      '*.production.*',
      '*.production'
    ],
    rev: [
      '**/*.js',
      '**/*.css',
      '**/*.png',
      '**/*.jpg',
      '**/*.svg',
      '**/*.gif',
      '**/*.ico',
      '**/*.json',
      '**/*.woff2',
      '**/*.woff',
      '**/*.ttf',
      '**/*.eot',
      '**/*.mp4',
      '**/*.webm',
      '**/*.mov'
    ],
    revReplace: [
      '!backend/**/*',
      '**/*.js',
      '**/*.json',
      '**/*.css',
      '*.html'
    ],
    zip: '**/*',
    zipOutput: 'dist.zip'
  };

  var environmentScripts = {
    development: 'development.js',
    production: 'production.js',
    test: 'test.js'
  };

  var cwd = _.get(userConfig, 'paths.cwd', process.cwd());
  var appPath = path.join(cwd, dirNames.app);
  var backendPath = path.join(cwd, dirNames.backend);
  var tmpPath = path.join(cwd, dirNames.tmp);
  var distPath = path.join(cwd, dirNames.dist);
  var vendorModulesPath = path.join(cwd, dirNames.vendorModules);
  var spritesPath = path.join(appPath, dirNames.images, dirNames.sprites);
  var imagesPath = path.join(appPath, dirNames.images);
  var specPath = path.join(appPath, dirNames.spec);
  var publicPath = path.join(appPath, dirNames.public);
  var srcPath = path.join(appPath, dirNames.src);
  var handlebarsPartialsPath = path.join(appPath, dirNames.handlebarsPartials);
  var fontsPath = path.join(publicPath, dirNames.fonts);
  var environmentPath = path.join(srcPath, dirNames.environment);

  return {
    dirNames: dirNames,
    filePatterns: filePatterns,
    environmentScripts: environmentScripts,
    paths: {
      app: appPath,
      cwd: cwd,
      src: srcPath,
      sprites: spritesPath,
      eslint: srcPath,
      backend: backendPath,
      public: publicPath,
      tmp: tmpPath,
      dist: distPath,
      images: imagesPath,
      vendorModules: vendorModulesPath,
      fonts: fontsPath,
      environment: environmentPath,
      spec: specPath,
      handlebarsPartials: handlebarsPartialsPath
    }
  };
};
