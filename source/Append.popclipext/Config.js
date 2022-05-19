"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = void 0;
const action = (selection) => {
    const separator = (popclip.modifierKeys & util.constant.MODIFIER_OPTION) !== 0 ? '' : '\n';
    if ((popclip.modifierKeys & util.constant.MODIFIER_SHIFT) !== 0) {
        pasteboard.text = selection.text.trim() + separator + pasteboard.text.trim();
    }
    else {
        pasteboard.text = pasteboard.text.trim() + separator + selection.text.trim();
    }
    return null;
};
exports.action = action;
