"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
const actions = (selection) => {
    // split input into lines and filter blank lines
    const inputLines = selection.text.split(/\r\n|\r|\n/).map(str => str.trim()).filter(str => str.length > 0);
    // if one
    if (inputLines.length > 1) {
        const action = {
            title: 'Join with commas',
            code() {
                popclip.pasteText(inputLines.join(', '));
            }
        };
        return action;
    }
    else {
        // split on commas and filter again
        const outputLines = inputLines[0].split(',').map(str => str.trim()).filter(str => str.length > 0);
        if (outputLines.length > 1) {
            const action = {
                title: 'Split into lines',
                code() {
                    popclip.pasteText(outputLines.join('\r'));
                }
            };
            return action;
        }
    }
};
exports.actions = actions;
