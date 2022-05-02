"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = exports.transliterate = void 0;
const table_json_1 = require("./table.json");
const lowerMap = new Map(Object.entries(table_json_1.lower));
const upperMap = new Map(Object.entries(table_json_1.upper));
function choose(from, cNext) {
    if (typeof from === 'string') {
        return from;
    }
    else if (lowerMap.has(cNext)) {
        return from[1];
    }
    else {
        return from[0];
    }
}
function t(c, cNext) {
    if (lowerMap.has(c)) {
        return lowerMap.get(c);
    }
    else if (upperMap.has(c)) {
        return choose(upperMap.get(c), cNext);
    }
    else {
        return c;
    }
}
function transliterate(input) {
    // split into array of characters
    let result = '';
    for (let i = 0; i < input.length; i += 1) {
        result += t(input[i], input[i + 1]);
    }
    return result;
}
exports.transliterate = transliterate;
const action = (input) => {
    return transliterate(popclip.input.text);
};
exports.action = action;
