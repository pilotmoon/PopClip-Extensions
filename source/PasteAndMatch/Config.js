define({
    // options: [{
    //     identifier: "icon",
    //     type: "boolean",
    //     label: "Show as Icon"        
    // }],
    actions: (selection, context, options) => {
        return {
            // icon: options.icon?"paste-equal.png":undefined,
            // oh dear, the option can't override the fallback icon!
            code: () => {
                popclip.pastePlain();
            }
        }
    }
});