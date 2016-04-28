# apptension-tools [![Build Status](https://secure.travis-ci.org/apptension/apptension-tools.png?branch=master)](https://travis-ci.org/apptension/apptension-tools)


## Description

What is `apptension-tools`?

* is an opinionated set of tools used by Apptension for development,
* is a way to unify infrastructure between various projects,
* contains predefined gulp tasks,
* contains predefined webpack configuration,
* uses eslint to lint your code,
* allows you to write in ES6 ans TypeScript out of the box,
* reduces time necessary to bootstrap your project,
* includes multi-environment support.

## Example

Wanna see an example of usage of apptension-tools?

We created an [yeoman generator](https://github.com/apptension/generator-apptension-angular) for projects written in AngularJS.
But know that any framework that would work in webpack is compatible with apptension-tools.

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

### Eslint

It lints all script files in project based on `.eslintrc` file.

### Karma

Launches karma server in `test` environment.

### Webpack

By default it takes `app/src/main.js` as an entry point and produces bundle out of it.
It also can spawn webpack dev server when `watch` argument passed to factory function
is `true`.

## Sass

Sass loader is included, you can import scss files in any javascript as you would normally do
in webpack.

## Postcss

Every css/scss file is going to be run through [postcss](https://github.com/postcss/postcss).
Currently only autoprefixer is configured.

### Spritesmith

Generates sprites, using [webpack-spritesmith](https://github.com/mixtur/webpack-spritesmith), from images located in `app/images/sprites` directory.
It expects that retina images are present and are suffixed with `-2x.png`.
It also generates sass file that contains variables and mixins necessary to use
images included in the sprite. It is located in `app/src/generated/_sprites.scss`.


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

#### karma

`gulp-karma` configuration object. Check  [github page](https://github.com/karma-runner/gulp-karma) for complete option's list.
