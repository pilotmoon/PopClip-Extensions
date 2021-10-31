"use strict";
/**
 * Utility module for ranged text replacement.
 * @module replace
 */
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceRanges = exports.replaceRangesAsync = void 0;
// generator: yield the `ranges.length + 1` sections of text before, in between and after the given ranges
function* textBetweenRanges(text, ranges) {
    let pos = 0;
    for (const range of ranges) {
        yield text.substring(pos, range.location);
        pos = range.location + range.length;
    }
    yield text.substring(pos, text.length);
}
// replace sections in a string with given replacements (async version)
const replaceRangesAsync = async (text, ranges, replacements) => {
    var e_1, _a;
    const between = textBetweenRanges(text, ranges);
    let result = between.next().value;
    try {
        for (var replacements_1 = __asyncValues(replacements), replacements_1_1; replacements_1_1 = await replacements_1.next(), !replacements_1_1.done;) {
            const item = replacements_1_1.value;
            result += item + between.next().value;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (replacements_1_1 && !replacements_1_1.done && (_a = replacements_1.return)) await _a.call(replacements_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
};
exports.replaceRangesAsync = replaceRangesAsync;
// replace sections in a string with given replacements (sync version)
const replaceRanges = (text, ranges, replacements) => {
    const between = textBetweenRanges(text, ranges);
    let result = between.next().value;
    for (const item of replacements) {
        result += item + between.next().value;
    }
    return result;
};
exports.replaceRanges = replaceRanges;
