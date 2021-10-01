/// <reference path="../../popclip.d.ts" />
define(function() {    
    let extension: ExtensionDefinition = {
        actions(selection, _context, options) {
            let actions = [];        
            if (selection.text) {            
                actions.push({
                    icon: '[64]',
                    title: 'Base64-encode',
                    code() {
                        popclip.pasteText(util.base64Encode(selection.text, {
                            urlSafe: options.variant==='url',
                            trimmed: options.trim===true
                        }));
                    }
                })
            }
            if (/^[A-Za-z0-9+_\-\/]+=?=?$/.test(selection.text)) {
                // this looks like base64-encoded text, so offer the decode function
                actions.push({
                    icon: '[[64]]',
                    title: 'Base64-decode',
                    code() {                    
                        const decoded=util.base64Decode(selection.text);                    
                        popclip.pasteText(decoded?decoded:"<Base64: Non-UTF8 result>");                    
                    }
                })
            }
            return actions;
        }
    }
    return extension;
});