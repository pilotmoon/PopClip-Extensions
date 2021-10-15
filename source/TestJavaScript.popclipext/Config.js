define(() => {
    let starIcon = `svg:
    <svg enable-background="new 0 0 510 510" version="1.1" viewBox="0 0 510 510" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
    <polygon points="255 402.21 412.59 497.25 370.9 318.01 510 197.47 326.63 181.74 255 12.75 183.37 181.74 0 197.47 139.1 318.01 97.41 497.25"/>
    </svg>
    `;
    
    return {        
        icon: starIcon,
        actions: (selection, context, options) => {
            let actions = []
            print("Hello!!");    
            if (selection.text) {        
                let bag = () => popclip.showText(selection.html);
                bag.title = "Brainn!!!";
                bag.icon = "symbol:bag";
                actions.push(bag);
                actions.push({                                    
                    title: "Hand",  // default to extension name?
                    icon: "symbol:hand.raised",   // default to extension icon?                   
                    code: (selection) => {
                        let hello = require('hello');   
                        let cj = require('./Config.json');   
                        let turndown = require('turndown');   
                        popclip.showText(cj["boo!"] + hello.hello())
                    },

                });
            }
            return actions;            
        }
    }
});