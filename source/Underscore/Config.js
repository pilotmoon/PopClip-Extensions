(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
/// <reference path="jsc.d.ts" />
/*
 * My own mini library for handy functions.
 */
/**
 * Apply a text-transformation function to the whitespace-trimmed part of the input only.
 * @param text The text to transform
 * @param f The transformation function
 */
function preserveEndSpace(text, f) {
    return text.replace(/^(\s*)(.*?)(\s*)$/gm, function (match, before, middle, after) {
        return before + f(middle) + (after ? after : '');
    });
}
preserveEndSpace.test = function () {
    var data = [
        ["  abc", "  ABC"],
        ["  abc\n aa", "  ABC\n AA"]
    ];
    data.forEach(function (pair) {
        var input = pair[0], output = pair[1];
        var result = preserveEndSpace(input, function (s) { return s.toUpperCase(); });
        var pass = output == result;
        print((output == result ? 'pass  ' : 'fail * ' + input + " => " + result + " (expected: " + output + ")"));
    });
};
/**
 * Either replace each run of spaces with the replacement character; or, if there are no
 * spaces, replace each run of the replacement character with a space.
 * @param text The text to transform
 * @param f The transformation function
 */
function replaceSpaces(text, character) {
    if (/[^\S\r\n]/.test(text)) { // match whitespace but not newline
        return text.replace(/([^\S\r\n]+)/g, character);
    }
    else {
        var regex = new RegExp("[" + character + "]+", 'g');
        return text.replace(regex, ' ');
    }
}
replaceSpaces.test = function () {
    var data = [
        ["John Smith", "John_Smith"],
        ["John J Smith   \n  Next line", "John_J_Smith_\n_Next_line"],
        ["a b c d", "a_b_c_d"],
        ["a_b c d", "a_b_c_d"],
        ["a_b_c__d", "a b c d"],
        ["", ""],
    ];
    data.forEach(function (pair) {
        var input = pair[0], output = pair[1];
        var result = replaceSpaces(input, "_");
        print((output == result ? 'pass  ' : 'fail * ' + input + " => " + result + " (expected: " + output + ")"));
    });
};
module.exports = { preserveEndSpace: preserveEndSpace, replaceSpaces: replaceSpaces };

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../popclip.d.ts" />
var utils = require("../../lib/utils");
define(function () {
    var extension = {
        actions: function (selection) {
            var result = utils.preserveEndSpace(selection.text, function (text) { return utils.replaceSpaces(text, '_'); });
            if (result !== selection.text) {
                return function () { return popclip.pasteText(result); };
            }
        }
    };
    return extension;
});

},{"../../lib/utils":1}]},{},[2]);
