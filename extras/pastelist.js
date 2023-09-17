"use strict";
/* eslint-disable @typescript-eslint/triple-slash-reference */
// #popclip
// name: Paste List
// language: javascript
// module: true
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
// variable for the current list
let lines = [];
// action for setting the list
const setList = {
    title: 'Set List',
    requirements: ['text'],
    code: (input) => {
        print('input', input);
        lines = input.text.split(/\n/);
        print('lines', lines);
    }
};
// action for pasting the first item in list
const pasteItem = {
    title: 'Paste Item',
    requirements: ['paste'],
    code: () => {
        var _a;
        const line = (_a = lines.shift()) !== null && _a !== void 0 ? _a : '';
        pasteboard.text = lines.join('\n');
        popclip.pasteText(line, { restore: true });
    }
};
exports.actions = [setList, pasteItem];
