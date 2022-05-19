"use strict";
// import { marked } from './marked.js'
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = void 0;
const action = (input, options, context) => {
    var _a, _b;
    // first save the selection attributes so we match font, color etc.
    // const html = marked.parse(input.text)
    // const rs = new RichString(html, { format: 'html' })
    const sourceOptions = { format: 'markdown', paragraphSeparation: options.paras };
    if (input.rtf.length > 0) {
        // rs.applyFont(new RichString(input.rtf)?.font) // apply original font
        sourceOptions.baseFont = (_a = new RichString(input.rtf, { format: 'rtf' })) === null || _a === void 0 ? void 0 : _a.font; // TODO test if undefined
    }
    if (typeof input.content['public.html'] === 'string') {
        // rs.applyFont(new RichString(input.rtf)?.font) // apply original font
        sourceOptions.baseFont = (_b = new RichString(input.content['public.html'], { format: 'html' })) === null || _b === void 0 ? void 0 : _b.font; // TODO test if undefined
    }
    const rs = new RichString(input.text, sourceOptions);
    // const content = { 'public.rtf': rs.rtf, 'public.html': rs.html }
    const content = { 'public.rtf': rs.rtf };
    if (context.hasFormatting) {
        popclip.pasteContent(content);
    }
    else {
        popclip.copyContent(content);
    }
    return null;
};
exports.action = action;
