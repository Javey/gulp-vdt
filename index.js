const through = require('through2');
const gutil = require('gulp-util');
const {Parser, Visitor} = require('vdt-compiler');

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
        delimiters: ['{', '}'],
        moduleName: 'intact',
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

        const parser = new Parser(file.contents.toString(), {delimiters: options.delimiters});
        const visitor = new Visitor(parser.ast);

        file.contents = Buffer.from(visitor.getModuleCode(options.moduleName));
        file.path = file.path.replace('.vdt', '.js');

        this.push(file);

        return cb();
    });
};
