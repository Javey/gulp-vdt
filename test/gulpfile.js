var gulp = require('gulp'),
    vdt = require('../index');

gulp.task('build', function() {
    gulp.src('tpl/**/*.vdt')
        .pipe(vdt())
        .pipe(gulp.dest('tpl'));
});