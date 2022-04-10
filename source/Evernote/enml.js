"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderEnml = exports.renderXhtml = exports.cleanHtml = void 0;
// Utility for rendering HTML as ENML (Evernote Markup Language),
// Evernote's rather fussy markup language for notes. It's XHTML (not HTML)
// with a couple of extra tags and a restriction on which tags can attributes can be used.
// The allowed list of tags and attributes  is given in enml.json.
// https://dev.evernote.com/doc/articles/enml.php
const sanitizeHtml = require("@popclip/sanitize-html.js");
const htmlparser2 = require("@popclip/htmlparser2.js");
const render = require("@popclip/dom-serializer.js");
const enml_json_1 = require("./enml.json");
// clean HTML by removing disallowed tags and attributes
const cleanHtml = (dirty) => {
    return sanitizeHtml(dirty, {
        allowedTags: enml_json_1.allowedTags,
        allowedAttributes: enml_json_1.allowedAttributes,
        exclusiveFilter: function (frame) {
            return frame.tag === 'a' && frame.text.trim().length === 0; // also remove empty links (usually anchors)
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
