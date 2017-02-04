/**
 * Created by Chris on 04/02/2017.
 */

var gulp = require('gulp');
var zip = require('gulp-zip');
var pjson = require('./package.json');

gulp.task('default', ['publish']);

gulp.task('publish', function () {
    gulp.src('src/**/*')
        .pipe(zip('startup-'+pjson.version+'.zip'))
        .pipe(gulp.dest('dist'));
});