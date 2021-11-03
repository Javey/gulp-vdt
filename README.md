# gulp-vdt

A plugin of gulp for compiling [vdt](https://github.com/Javey/vdt.js) template.

# Usage

```js
var gulp = require('gulp'),
    vdt = require('gulp-vdt');

gulp.task('build', function() {
    return gulp.src('tpl/**/*.vdt')
        .pipe(vdt())
        .pipe(gulp.dest('tpl'));
});
```

# vdt([options])

* `options.delimiters = ['{', '}']` Sepcify the delimiters of vdt.
* `options.moduleName = 'intact'` Sepcify the module that imports helpers from
