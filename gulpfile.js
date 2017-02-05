/**
 * Created by Chris on 04/02/2017.
 */

var gulp = require('gulp');
var zip = require('gulp-zip');
var manifest = require('./src/manifest.json');

gulp.task('default', ['publish']);

gulp.task('publish', function () {
    gulp.src('src/**/*')
        .pipe(zip('startup-'+manifest.version+'.zip'))
        .pipe(gulp.dest('dist'));
});