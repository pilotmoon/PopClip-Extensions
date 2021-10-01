/// <reference path="../../popclip.d.ts" />
define({
    name: util.localize("Paste") + " =",
    options: [{
            identifier: "showIcon",
            type: "boolean",
            label: util.localize("Show as Icon"),
            defaultValue: false
        }],
    actions: function () {
        if (popclip.context.canPaste && popclip.context.hasFormatting) {
            return {
                // `undefined` will fall back to the extension's icon; `null` sets no icon
                icon: popclip.options['showIcon'] ? undefined : null,
                code: function () {
                    popclip.pasteText(pasteboard.text);
                }
            };
        }
    }
});
