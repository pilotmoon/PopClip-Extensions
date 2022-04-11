"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = void 0;
const marked_js_1 = require("./marked.js");
const action = (input) => {
    var _a;
    // first save the selection attributes so we match font, color etc.
    const html = marked_js_1.marked.parse(input.text);
    const rs = new RichString(html, { format: 'html' });
    if (input.rtf.length > 0) {
        rs.applyFont((_a = new RichString(input.rtf)) === null || _a === void 0 ? void 0 : _a.font); // apply original font
    }
    popclip.pasteContent({ 'public.rtf': rs.rtf, 'public.html': rs.html });
};
exports.action = action;
