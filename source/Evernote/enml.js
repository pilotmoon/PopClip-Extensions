"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderEnml = exports.renderXhtml = exports.cleanHtml = void 0;
// Utility for rendering HTML as XHTML or ENML
// https://dev.evernote.com/doc/articles/creating_notes.php
const sanitizeHtml = require("sanitize-html");
const htmlparser2 = require("htmlparser2");
const render = require("./dom-serializer");
const enml_json_1 = require("./enml.json");
// clean HTML suitable for use as ENML
const cleanHtml = (dirty) => {
    return sanitizeHtml(dirty, {
        allowedTags: enml_json_1.allowedTags,
        allowedAttributes: {
            a: ['href', 'name', 'target'],
            img: ['src', 'alt', 'title', 'width', 'height']
        },
        exclusiveFilter: function (frame) {
            return frame.tag === 'a' && frame.text.trim().length === 0; // remove empty links (often anchors)
        }
    });
};
exports.cleanHtml = cleanHtml;
// render given HTML string as XHTML
const renderXhtml = (html) => {
    const document = htmlparser2.parseDocument(html);
    return render(document, { xmlMode: true });
};
exports.renderXhtml = renderXhtml;
// render given HTML string as ENML
const renderEnml = (html) => {
    const prefix = '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">\n<en-note>';
    const suffix = '</en-note>';
    return prefix + (0, exports.renderXhtml)((0, exports.cleanHtml)(html)) + suffix;
};
exports.renderEnml = renderEnml;
