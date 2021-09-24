define({
    actions: (selection) => {
        let actions = [];        
        if (selection.text) {
            // offer to encode any nonzero text
            actions.push({
                icon: '[64]',
                title: 'Base64-encode',
                code: (selection, context, options) => {
                    // it encodes using utf-8
                    popclip.pasteText(Util.base64Encode(selection.text, options.variant==='urlsafe'));
                }
            })
        }
        if (/^[A-Za-z0-9+_\-\/]+=?=?$/.test(selection.text)) {
            // this looks like base64-encoded text, so offer the decode function
            actions.push({
                icon: '[[64]]',
                title: 'Base64-decode',
                code: (selection) => {
                    // note this assumes utf-8 encoding
                    let decoded=Util.base64Decode(selection.text);                    
                    popclip.pasteText(decoded?decoded:"<Base64: Non-UTF-8 result>");                    
                }
            })
        }
        return actions;
    }
});