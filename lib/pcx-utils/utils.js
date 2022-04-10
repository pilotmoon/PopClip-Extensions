"use strict";
/*
 * My own mini library for handy functions.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceSpaces = exports.preserveEndSpace = void 0;
/**
 * Apply a text-transformation function to the whitespace-trimmed part of the input only.
 * @param text The text to transform
 * @param f The transformation function
 */
function preserveEndSpace(text, f) {
    return text.replace(/^(\s*)(.*?)(\s*)$/gm, (match, before, middle, after) => {
        var _a;
        return `${before}${f(middle)}${(_a = after) !== null && _a !== void 0 ? _a : ''}`;
    });
}
exports.preserveEndSpace = preserveEndSpace;
preserveEndSpace.test = function () {
    var data = [
        ['  abc', '  ABC'],
        ['  abc\n aa', '  ABC\n AA']
    ];
    data.forEach(function (pair) {
        var input = pair[0];
        var output = pair[1];
        var result = preserveEndSpace(input, (s) => s.toUpperCase());
        print((output === result ? 'pass  ' : 'fail * ' + input + ' => ' + result + ' (expected: ' + output + ')'));
    });
};
/**
 * Either replace each run of spaces with the replacement character; or, if there are no
 * spaces, replace each run of the replacement character with a space.
 * @param text The text to transform
 * @param f The transformation function
 * */
function replaceSpaces(text, character) {
    if (/[^\S\r\n]/.test(text)) { // match whitespace but not newline
        return text.replace(/([^\S\r\n]+)/g, character);
    }
    else {
        const regex = new RegExp(`[${character}]+`, 'g');
        return text.replace(regex, ' ');
    }
}
exports.replaceSpaces = replaceSpaces;
replaceSpaces.test = function () {
    const data = [
        ['John Smith', 'John_Smith'],
        ['John J Smith   \n  Next line', 'John_J_Smith_\n_Next_line'],
        ['a b c d', 'a_b_c_d'],
        ['a_b c d', 'a_b_c_d'],
        ['a_b_c__d', 'a b c d'],
        ['', '']
    ];
    data.forEach((pair) => {
        const [input, output] = pair;
        const result = replaceSpaces(input, '_');
        print((output === result ? 'pass  ' : 'fail * ' + input + ' => ' + result + ' (expected: ' + output + ')'));
    });
};
