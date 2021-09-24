// some info about HTML entities https://developer.mozilla.org/en-US/docs/Glossary/Entity
let entities = require('html-entities');
if (typeof(define) !== 'undefined') {
    define({
        actions: (selection) => {
            let actions = [];        

            // offer to encode any nonzero text
            if (selection.text) {                
                actions.push({
                    icon: '[&;]',
                    title: 'HTML-encode',
                    code: (selection) => {
                        popclip.pasteText(entities.encode(selection.text));
                    }
                })
            }       
            
            // this looks like HTML encoded text, so offer the decode function
            if (/&(\w+|#\d+);/.test(selection.text)) {                
                actions.push({
                    icon: '[[&;]]',
                    title: 'HTML-decode',
                    code: (selection) => {
                        popclip.pasteText(entities.decode(selection.text));
                    }
                })
            }
            
            return actions;
        }
    });
}
else { // "test suite" :)
    print(entities.encode("< >"))
    print(entities.encode("&lt; &gt;"));
}