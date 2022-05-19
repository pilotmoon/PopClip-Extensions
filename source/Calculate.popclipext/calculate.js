"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
const mathjs_1 = require("mathjs");
const actions = (selection) => {
    // const separator = util.localeInfo.decimalSeparator
    if (selection.text.length > 1000) { // limit input size
        return null;
    }
    let text = selection.text.trim();
    const endsWithEquals = text.endsWith('=');
    if (endsWithEquals) {
        text = text.substring(0, text.length - 1);
    }
    // replace locale decimal separator with .
    // text = text.replace(separator, '.')
    let result = (0, mathjs_1.evaluate)(text);
    if (result === undefined || typeof result === 'function' || typeof result === 'string') {
        return null;
    }
    if ((0, mathjs_1.typeOf)(result) === 'ResultSet') {
        const resultArray = result.valueOf();
        result = resultArray[resultArray.length - 1]; // take final entry of resultset
    }
    let resultString = (0, mathjs_1.format)(result, { notation: 'fixed' });
    const maxLength = 40;
    if (resultString.length > maxLength) {
        resultString = resultString.substring(0, maxLength) + '…';
    }
    // replace . with local decimal separator
    // resultString = resultString.replace('.', separator)
    return {
        title: resultString,
        icon: null,
        code: () => endsWithEquals ? selection.text + resultString : resultString
    };
};
exports.actions = actions;
