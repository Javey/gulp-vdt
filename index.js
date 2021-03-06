var through = require('through2'),
    gutil = require('gulp-util'),
    Vdt = require('vdt');

var hasOwn = Object.prototype.hasOwnProperty;
    extend = function(dest, source) {
    if (source) {
        for (var key in source) {
            if (hasOwn.call(source, key)) {
                dest[key] = source[key];
            }
        }
    }
    return dest;
};

module.exports = function(options) {
    options = extend({
        format: 'amd',
        autoReturn: true,
        onlySource: true
    }, options);

    return through.obj(function(file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-vdt', 'Streams are not supported'));
            return cb();
        }

        // if is a js file return
        if (/\.js$/.test(file.path)) {
            this.push(file);
            return cb();
        }

        var fn = Vdt.compile(file.contents.toString(), options);
        var contents = fn.source;
        if (options.amd === false) {
            options.format = '';
        }
        if (options.format === 'amd') {
            contents = 'define(function(require) {\n return ' + contents + '\n})';
        } else if (options.format === 'cjs') {
            contents = 'module.exports = ' + contents;
            if (fn.head) {
                contents = fn.head + "\n" + contents;
            }
        } else if (options.format === 'module') {
            contents = 'export default ' + contents;
            if (fn.head) {
                contents = fn.head + "\n" + contents;
            }
        }

        file.contents = Buffer.from(contents);
        file.path = file.path.replace('.vdt', '.js');

        this.push(file);

        return cb();
    });
};
