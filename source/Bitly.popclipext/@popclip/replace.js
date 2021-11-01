"use strict";
/**
 * Utility module for ranged text replacement.
 * @module replace
 */
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
    const between = textBetweenRanges(text, ranges);
    let result = between.next().value;
    for await (const item of replacements) {
        result += item + between.next().value;
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
