var gulp = require('gulp'),
    vdt = require('../index');

gulp.task('build', function() {
    return gulp.src('tpl/**/*.vdt')
        .pipe(vdt())
        .pipe(gulp.dest('tpl'));
});

gulp.task('js', function() {
    return gulp.src('tpl/**/*.js')
        .pipe(vdt())
        .pipe(gulp.dest('js'));
});
