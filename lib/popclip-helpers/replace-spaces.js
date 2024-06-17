"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceSpaces = void 0;
/*
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
