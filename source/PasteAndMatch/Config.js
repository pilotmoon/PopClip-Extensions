define({
    name: `${Util.localize("Paste")} =`,
    options: [{
        identifier: "icon",
        type: "boolean",
        label: Util.localize("Show as Icon")
    }],
    actions: (selection, context, options) => {
        if (context.canPaste && context.hasFormatting) {
            let action = () => popclip.pastePlain();
            action.icon=options.icon?undefined:null;        
            return action;            
        }
    }
});