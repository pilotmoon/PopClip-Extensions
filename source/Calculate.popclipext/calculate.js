"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
const mathjs_1 = require("mathjs");
const actions = (selection) => {
    print('calculate actions');
    if (selection.text.length > 1000) { // limit input size
        return;
    }
    let text = selection.text.trim();
    const endsWithEquals = text.endsWith('=');
    if (endsWithEquals) {
        text = text.substring(0, text.length - 1);
    }
    let result = (0, mathjs_1.evaluate)(text);
    if (result === undefined || typeof result === 'function') {
        return;
    }
    if ((0, mathjs_1.typeOf)(result) === 'ResultSet') {
        const resultArray = result.valueOf();
        result = resultArray[resultArray.length - 1]; // take final entry of resultset
    }
    const resultString = (0, mathjs_1.format)(result, { notation: 'fixed' });
    return {
        title: resultString,
        icon: null,
        code: () => endsWithEquals ? selection.text + resultString : resultString
    };
};
exports.actions = actions;
