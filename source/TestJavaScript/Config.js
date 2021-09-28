util.define(() => {
    let starIcon = `svg:
    <svg enable-background="new 0 0 510 510" version="1.1" viewBox="0 0 510 510" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
    <polygon points="255 402.21 412.59 497.25 370.9 318.01 510 197.47 326.63 181.74 255 12.75 183.37 181.74 0 197.47 139.1 318.01 97.41 497.25"/>
    </svg>
    `;
    let hello = require('./hello.js');
    return {        
        icon: starIcon,
        actions: (selection, context, options) => {
            let actions = []
            util.print("Hello!!");    
            if (selection.text) {
                let bag = () => popclip.showText("brainy!");
                bag.title = "Brainn";
                bag.icon = "symbol:bag";
                actions.push(bag);
                actions.push({      
                    title: "Hand",  // default to extension name?
                    icon: "symbol:hand.raised",   // default to extension icon?                   
                    code: (selection) => {
                        popclip.openUrl("https://xkcd.com/", {app: "com.apple.Safari"});
                    },
                    flags: {
                        stayVisible: true,
                    },
                });
            }
            return actions;            
        },
        // options: [
        //     {identifier: "myoption", label: "My Option", type: "string"},
        //     {identifier: "mybool",label: "Bool Option",type: "boolean"}
        // ],
        // code: (selection, context, options) => {
        //     popclip.log(console);
        //     popclip.log(hello.hello());
        //     popclip.copyText(Util.htmlToMarkdown(selection.html));
        // },
    }
});
