define({
    name: `${Util.localize("Paste")} + ↵`,
    options: [{
        identifier: "showIcon",
        type: "boolean",
        label: Util.localize("Show as Icon")
    }],
    actions: (selection, context, options) => {
        if (context.canPaste) {
            let action = () => {
                popclip.performPaste();
                popclip.pressKey(Util.Constant.KEY_RETURN);
            }
            action.icon=options.showIcon?undefined:null;        
            return action;            
        }
    }
});