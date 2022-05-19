(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.foo = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
const transform_lines_1 = require("@popclip/helpers/transform-lines");
const replace_spaces_1 = require("@popclip/helpers/replace-spaces");
const actions = (selection) => {
    const result = (0, transform_lines_1.transformLines)(selection.text, (text) => (0, replace_spaces_1.replaceSpaces)(text, '-'));
    if (result !== selection.text) {
        return () => popclip.pasteText(result);
    }
};
exports.actions = actions;

},{"@popclip/helpers/replace-spaces":1,"@popclip/helpers/transform-lines":2}]},{},[3])(3)
});
