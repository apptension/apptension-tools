var gulp = require('gulp');
var rev = require('gulp-rev');
var env = require('./utils/env');

var config = require('./config');

module.exports = function () {
    if (!env.isProduction()) {
        return;
    }

    return gulp.src([
        '**/*.js',
        '**/*.css'
    ], {cwd: config.paths.tmp})
        .pipe(rev())
        .pipe(gulp.dest(config.paths.dist))
        .pipe(rev.manifest(config.revManifest))
        .pipe(gulp.dest(config.paths.tmp));
};
