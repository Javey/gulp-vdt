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
        amd: true,
        autoReturn: true
    }, options);

    return through.obj(function(file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-vdt', 'Streams are not supported'));
            return cb();
        }

        // if is a js file return
        if (/\.js$/.test(file.path)) {
            return cb();
        }

        var contents = Vdt.compile(file.contents.toString(), options).source;
        if (options.amd) {
            contents = 'define(function(require) {\n return ' + contents + '\n})';
        }

        file.contents = new Buffer(contents);
        file.path = file.path.replace('.vdt', '.js');

        this.push(file);

        return cb();
    });
};
