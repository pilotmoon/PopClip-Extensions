"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var entities = require("html-entities");
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
            code: function (selection, _context, options) {
                popclip.pasteText(entities.encode(selection.text, { mode: options.mode }));
            }
        }, {
            icon: '[[&;]]',
            title: 'HTML-decode',
            regex: /&(\w+|#\d+);/,
            code: function (selection) {
                popclip.pasteText(entities.decode(selection.text));
            }
        }]
});
