"use strict";
/**
 * Utility module for ranged text replacement.
 * @module replace
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceRanges = void 0;
/**
 * Construct array of the text sections in between the defined ranges
 * @param ranges The text
 * @param length Array of ranges within the text bounds.
 * @return Array of `ranges.length + 1` strings between the ranges.
 */
function betweenRanges(text, ranges) {
    const result = [];
    let pos = 0;
    ranges.forEach((range, idx) => {
        result.push(text.substring(pos, range.location)); // push section before range
        pos = range.location + range.length;
    });
    result.push(text.substring(pos, text.length)); // ass on final section to end
    return result;
}
/**
 * Replace sections in a string with supplied replacements.
 * @param text The string in which to replace sections.
 * @param replacements The ranges where they should be replaced in the text.
 * @param transform
 */
const replaceRanges = (text, ranges, transform) => {
    const between = betweenRanges(text, ranges);
    return ranges.reduce((prev, cur, idx) => {
        return prev + transform(text.substring(cur.location, cur.location + cur.length), idx) + between[idx + 1];
    }, between[0]);
};
exports.replaceRanges = replaceRanges;
