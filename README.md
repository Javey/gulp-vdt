# gulp-vdt

A plugin of gulp for compiling [vdt](https://github.com/Javey/vdt.js) template.

# Usage

```js
var gulp = require('gulp'),
    vdt = require('gulp-vdt');

gulp.task('build', function() {
    gulp.src('tpl/**/*.vdt')
        .pipe(vdt())
        .pipe(gulp.dest('tpl'));
});
```