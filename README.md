# apptension-tools [![Build Status](https://secure.travis-ci.org/apptension/apptension-tools.png?branch=master)](https://travis-ci.org/apptension/apptension-tools)


## Description

What is `apptension-tools`?

* is an opinionated set of tools used by Apptension for development,
* is a way to unify infrastructure between various projects,
* contains predefined gulp tasks,
* contains predefined webpack configuration,
* uses eslint to lint your code,
* allows you to write in ES6 out of the box,
* reduces time necessary to bootstrap your project,
* includes multi-environment support.


## Predefined Gulp tasks

Apptension-tools contains a set of gulp tasks that
you can use in your project. Here you will find each of those
briefly explained. Most of them behave a bit differently depending
on environment in which they are run.

### BrowserSync
Launches browserSync server.

###### Development

It will proxy all the calls to webpack dev server.

###### Production

It serves files from `dist` directory. Useful to check your build.

### Clean

Deletes `.tmp` and `dist` directories together with their content.

### CompileIndex

Compiles handlebars template to produce html file.
It supports multiple entry points.

###### Development

Injects webpack dev server script.

###### Production

Removes development scripts.

### CopyBackend

###### Development

Not applicable.

###### Production

Copies whole `backend` directory to `dist`.

### CopyProduction

###### Development

Not applicable.

###### Production

Copies all files that contain `*.production.*` in their name
from current working directory to `dist`. It removes the `production` part.

### CopyPublicAssets

Copies `app/public` directory to output dir.

###### Development

Output directory is `.tmp`.

###### Production

Output directory is `dist`.


### Eslint

It lints all script files in project based on `.eslintrc` file.

### Images

Copies files from `images` directory to output dir.

###### Development

Output directory is `.tmp`.

###### Production

Output directory is `dist`. Also applies imagemin.

### Karma

Launches karma server in `test` environment.

### Rev

###### Development

Not applicable.

###### Production

Appends random hash to styles and scripts filenames in order to
bust browser's cache on subsequent deploys. It generates rev manifest file
that is later used by CompileIndex task. Outputs files to `dist` directory.

### Rev-replace

###### Development

Not applicable.

###### Production

Replaces all paths to assets in `.html`, `.js` and `.css` files with those produced by `rev` task.

### Sass

Compiles sass files into css using [node-sass](https://github.com/sass/node-sass).
It is not a part of the webpack build process in order to support sprites generation.
Files are written to `.tmp` directory.

###### Production

Additionally css is minified.

### Spritesmith

Generates sprites from images located in `app/images/sprites` directory. It expects
that retina images are present and are suffixed with `-2x.png`.
It also generates sass file that contains variabled and mixins necessary to use
images included in the sprite.


Example of usage:
```scss
.icon-example-filename {
    @include retina-sprite($example-group);
}
```

In above example the task expects those two files to be present in sprites dir:

* exampleFilename.png
* exampleFilename-2x.png

where former is **exactly** twice as big. In case it is not, the task will fail.

### Webpack

By default it takes `app/src/main.js` as an entry point and produces bundle out of it.
It also can spawn webpack dev server when `watch` argument passed to factory function
is `true`.

#### node_modules

Primarily you should use `npm` as a dependency manager.

#### bower_components

You can require bower components by using relative path.

#### vendor_modules

It is a predefined alias.
You can put libraries downloaded from other sources into `vendor_modules` directory
residing in root.

Those can later be used with:

```js
import vendorExample from 'vendor_modules/vendorExample';
```

#### vendor-styles.css

All css files required in javascript will be extracted to `vendor-styles.css` which
you can add to your index file template. Remember to use `assetPath` helper.

###### Development

Additionally includes source maps. By default webpack's devtools are set to `eval`
as it is the fastest option.

###### Production

Additionally uglifies the script.

#### \_\_DEBUG\_\_

Webpack task uses [DefinePlugin](https://webpack.github.io/docs/list-of-plugins.html#defineplugin)
to set `__DEBUG__` variable. It allows you to include specific blocks of code only
in development bundle.

###### Development

```js
if(__DEBUG__) {
    // this will be included in development bundle
}
```

###### Production

```js
if(__DEBUG__) {
    // this will not be included in production bundle
}
```

### zip

###### Development

Not applicable.

###### Production

Compresses `dist` directory to `dist.zip`.

## Configure tasks

Tasks can be configured through Gulpfile.

```js
var tasks = require('apptension-tools/gulp')({
    // insert config options here
});
```

### Options

#### port

type: `number`

Default: '8000'

Port of webpack dev server.

#### domain
type: 'string'

Default: '0.0.0.0'

Domain of webpack dev server.

#### webpack
type: 'Object'

`webpack` configuration object. Check webpack's [documentation](https://webpack.github.io/docs/configuration.html) for complete option's list.

#### webpackDevServer
type: 'Object'

`webpack-dev-server` configuration object. Check webpack's [documentation](https://webpack.github.io/docs/webpack-dev-server.html)' for complete option's list.

#### sass
type: 'Object'

`node-sass` configuration object. Check [github page](https://github.com/sass/node-sass) for complete option's list.

#### karma

`gulp-karma` configuration object. Check  [github page](https://github.com/karma-runner/gulp-karma) for complete option's list.

## Known issues

* As of now due to a bug in autoprefixer sourcemaps for sass are not generated.
