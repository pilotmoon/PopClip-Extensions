"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// some info about HTML entities https://developer.mozilla.org/en-US/docs/Glossary/Entity
// npm page for html-entities library https://www.npmjs.com/package/html-entities
const entities = require("./html-entities");
defineExtension({
    options: [{
            identifier: 'mode',
            label: 'Encoding Mode',
            type: 'multiple',
            values: ['specialChars', 'nonAsciiPrintable'],
            valueLabels: ["HTML special characters only (<>&\"')", 'All non-ASCII characters']
        }],
    actions: [{
            icon: '[&;]',
            title: 'HTML-encode',
            code: (selection, options) => {
                popclip.pasteText(entities.encode(selection.text, { mode: options.mode }));
                return null;
            }
        }, {
            icon: '[[&;]]',
            title: 'HTML-decode',
            regex: /&(\w+|#\d+);/,
            code: (selection) => {
                popclip.pasteText(entities.decode(selection.text));
                return null;
            }
        }]
});
