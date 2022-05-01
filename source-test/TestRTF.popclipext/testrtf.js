"use strict";
// import { marked } from './marked.js'
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = void 0;
const action = (input, options, context) => {
    popclip.pasteText(input.rtf);
    // // first save the selection attributes so we match font, color etc.
    // // const html = marked.parse(input.text)
    // // const rs = new RichString(html, { format: 'html' })
    // const sourceOptions: any = { format: 'markdown', paragraphSeparation: options.paras }
    // if (input.rtf.length > 0) {
    //   // rs.applyFont(new RichString(input.rtf)?.font) // apply original font
    //   sourceOptions.baseFont = new RichString(input.rtf, { format: 'rtf' })?.font // TODO test if undefined
    // }
    // if (typeof input.content['public.html'] === 'string') {
    //   // rs.applyFont(new RichString(input.rtf)?.font) // apply original font
    //   sourceOptions.baseFont = new RichString(input.content['public.html'], { format: 'html' })?.font // TODO test if undefined
    // }
    // const rs = new RichString(input.text, sourceOptions)
    // const content = { 'public.rtf': rs.rtf, 'public.html': rs.html }
    // if (context.hasFormatting) {
    //   popclip.pasteContent(content)
    // } else {
    //   popclip.copyContent(content)
    // }
};
exports.action = action;
