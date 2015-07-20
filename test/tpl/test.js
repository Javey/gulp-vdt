define(function(require) {
 return function(obj, _Vdt, blocks) {
_Vdt || (_Vdt = Vdt);
blocks || (blocks = {});
var h = _Vdt.virtualDom.h, widgets = this.widgets || {}, _blocks = {}, __blocks = {},
hasOwn = Object.prototype.hasOwnProperty,
extend = function(dest, source) {
if (source) {
for (var key in source) {
if (hasOwn.call(source, key)) {dest[key] = source[key];}
}
}
return dest;
};
extend(__blocks, blocks);
with (obj || {}) {
return h('div',null, ['test'])
}
}
})