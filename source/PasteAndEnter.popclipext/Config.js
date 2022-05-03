/// <reference path="../../popclip.d.ts" />
define({
    name: `${util.localize("Paste")} + ↵`,
    options: [{
            identifier: "showIcon",
            type: "boolean",
            label: util.localize("Show as Icon"),
            defaultValue: false
        }],
    actions() {
        if (popclip.context.canPaste) {
            return {
                // `undefined` will fall back to the extension's icon; `null` sets no icon
                icon: popclip.options['showIcon'] ? undefined : null,
                code() {
                    if (popclip.modifierKeys & util.constant.MODIFIER_SHIFT) {
                        popclip.pasteText(pasteboard.text);
                    }
                    else {
                        popclip.performPaste();
                    }
                    popclip.pressKey(util.constant.KEY_RETURN);
                }
            };
        }
    }
});
