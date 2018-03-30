var gulp = require('gulp'),
    vdt = require('../index');

gulp.task('build', function() {
    gulp.src('tpl/**/*.vdt')
        .pipe(vdt())
        .pipe(gulp.dest('tpl'));
});

gulp.task('build:cjs', function() {
    gulp.src('tpl/**/*.vdt')
        .pipe(vdt({format: 'cjs'}))
        .pipe(gulp.dest('tpl'));
});


gulp.task('js', function() {
    gulp.src('tpl/**/*.js')
        .pipe(vdt())
        .pipe(gulp.dest('js'));
});
