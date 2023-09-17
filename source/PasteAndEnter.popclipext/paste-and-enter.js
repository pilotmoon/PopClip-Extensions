"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extension = {
    name: `${util.localize('Paste')} + ↵`,
    options: [{
            identifier: 'showIcon',
            type: 'boolean',
            label: util.localize('Show as Icon'),
            defaultValue: false
        }],
    actions() {
        if (popclip.context.canPaste) {
            return {
                // `undefined` will fall back to the extension's icon; `null` sets no icon
                icon: popclip.options.showIcon ? undefined : null,
                code() {
                    if (popclip.modifiers.shift) {
                        popclip.pasteText(pasteboard.text);
                    }
                    else {
                        popclip.performCommand('paste');
                    }
                    popclip.pressKey(util.constant.KEY_RETURN);
                }
            };
        }
    }
};
exports.default = extension;
