define({
    actions: (selection) => {
        let actions = [];        
        if (selection.text) {
            // offer to encode any nonzero text
            actions.push({
                icon: '[%]',
                title: 'URL-encode',
                code: (selection) => {
                    popclip.pasteText(encodeURIComponent(selection.text));
                }
            })
        }
        if (/%[0-9A-Fa-f][0-9A-Fa-f]/.test(selection.text)) {
            // this looks%20like%20percent-encoded text, so offer the decode function
            actions.push({
                icon: '[[%]]',
                title: 'URL-decode',
                code: (selection) => {
                    popclip.pasteText(decodeURI(selection.text));
                }
            })
        }
        return actions;
    }
});