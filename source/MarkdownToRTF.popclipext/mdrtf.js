"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = void 0;
const action = (input, options, context) => {
    const rs = new RichString(input.text, { format: 'markdown' });
    popclip.copyContent({ 'public.rtf': rs.rtf });
    return null;
};
exports.action = action;
