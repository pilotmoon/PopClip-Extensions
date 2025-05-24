"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformLines = void 0;
/**
* Apply a text-transformation function to each input line, ignoring any the leading
* and trailing whitespace.
* @param text The text to transform
* @param f The transformation function
*/
function transformLines(text, f) {
    return text.replace(/^(\s*)(.*?)(\s*)$/gm, (match, before, middle, after) => {
        var _a;
        return `${before}${f(middle)}${(_a = after) !== null && _a !== void 0 ? _a : ''}`;
    });
}
exports.transformLines = transformLines;
transformLines.test = function () {
    var data = [
        ['  abc', '  ABC'],
        ['  abc\n aa', '  ABC\n AA']
    ];
    data.forEach(function (pair) {
        var input = pair[0];
        var output = pair[1];
        var result = transformLines(input, (s) => s.toUpperCase());
        print((output === result ? 'pass  ' : 'fail * ' + input + ' => ' + result + ' (expected: ' + output + ')'));
    });
};
