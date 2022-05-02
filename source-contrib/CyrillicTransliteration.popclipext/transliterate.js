"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = exports.transliterate = void 0;
const table_json_1 = require("./table.json");
function choose(from, cNext) {
    if (typeof from === 'string') {
        return from;
    }
    else {
        return (cNext in table_json_1.lower) ? from[1] : from[0];
    }
}
function t(c, cNext) {
    if (c in table_json_1.lower) {
        return table_json_1.lower[c];
    }
    else if (c in table_json_1.upper) {
        return choose(table_json_1.upper[c], cNext);
    }
    else {
        return c;
    }
}
function transliterate(input) {
    // split into array of characters
    let result = '';
    // special case of empty string
    if (input.length > 0) {
        // loop up to last but one character
        for (let i = 0; i < input.length - 1; i += 1) {
            result += t(input[i], input[i + 1]);
        }
        // finish with last character
        result += t(input[input.length - 1], '');
    }
    return result;
}
exports.transliterate = transliterate;
const action = (input) => {
    return transliterate(popclip.input.text);
};
exports.action = action;
