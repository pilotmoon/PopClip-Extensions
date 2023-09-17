"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = void 0;
const action = (selection) => {
    const separator = popclip.modifiers.option ? '' : '\n';
    if (popclip.modifiers.option) {
        pasteboard.text = selection.text.trim() + separator + pasteboard.text.trim();
    }
    else {
        pasteboard.text = pasteboard.text.trim() + separator + selection.text.trim();
    }
};
exports.action = action;
