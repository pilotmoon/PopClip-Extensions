define({
    options: [{
        identifier: "icon",
        type: "boolean",
        label: "Show as Icon"        
    }],
    actions: (selection, context, options) => {
        return {
            icon: options.icon?undefined:null, // undefined means use fallback image, null mean use no image
            code: () => {
                popclip.pastePlain();
            }
        }
    }
});