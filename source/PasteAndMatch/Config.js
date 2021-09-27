define({
    name: `${Util.localize("Paste")} =`,
    options: [{
        identifier: "showIcon",
        type: "boolean",
        label: Util.localize("Show as Icon")
    }],
    actions() {
        if (popclip.context.canPaste && popclip.context.hasFormatting) {
            return {
                // `undefined` will fall back to the extension's icon; `null` sets no icon
                icon: popclip.options.showIcon?undefined:null,
                code() {
                    popclip.pastePlain()
                }
            }            
        }
    }
});