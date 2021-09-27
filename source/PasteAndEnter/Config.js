define({
    name: `${Util.localize("Paste")} + ↵`,
    options: [{
        identifier: "showIcon",
        type: "boolean",
        label: Util.localize("Show as Icon")
    }],
    actions() {
        if (popclip.context.canPaste) {
            return {
                // `undefined` will fall back to the extension's icon; `null` sets no icon
                icon: popclip.options.showIcon?undefined:null, 
                code() {
                    if (popclip.modifierKeys & Util.Constant.MODIFIER_SHIFT) {
                        popclip.pastePlain();        
                    }
                    else {
                        popclip.performPaste();
                    }                        
                    popclip.pressKey(Util.Constant.KEY_RETURN);
                }                        
            }            
        }
    }
});