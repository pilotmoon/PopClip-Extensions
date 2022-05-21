"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderEnml = exports.renderXhtml = exports.cleanHtml = void 0;
// Utility for rendering HTML as ENML (Evernote Markup Language),
// Evernote's rather fussy markup language for notes. It's XHTML (not HTML)
// with a couple of extra tags and a restriction on which tags can attributes can be used.
// The allowed list of tags and attributes  is given in enml.json.
// https://dev.evernote.com/doc/articles/enml.php
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const htmlparser2_1 = __importDefault(require("htmlparser2"));
const dom_serializer_1 = __importDefault(require("dom-serializer"));
const enml_json_1 = require("./enml.json");
// clean HTML by removing disallowed tags and attributes
const cleanHtml = (dirty) => {
    return (0, sanitize_html_1.default)(dirty, {
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
    const document = htmlparser2_1.default.parseDocument(html);
    return (0, dom_serializer_1.default)(document, { xmlMode: true });
};
exports.renderXhtml = renderXhtml;
// render given HTML string as ENML
const renderEnml = (html) => {
    const prefix = '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">\n<en-note>';
    const suffix = '</en-note>';
    return prefix + (0, exports.renderXhtml)((0, exports.cleanHtml)(html)) + suffix;
};
exports.renderEnml = renderEnml;
