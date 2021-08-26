const starIcon = `svg:
<svg enable-background="new 0 0 510 510" version="1.1" viewBox="0 0 510 510" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
<polygon points="255 402.21 412.59 497.25 370.9 318.01 510 197.47 326.63 181.74 255 12.75 183.37 181.74 0 197.47 139.1 318.01 97.41 497.25"/>
</svg>
`
var Extension = {
    identifier: "com.pilotmoon.popclip.extension.test-js",
    name: "Test JS!",
    icon: "text:[hi!]",    
    code: (selection) => {
        popclip.paste(selection.text.normalize().toUpperCase());
    }
}

//     populate: (selection, context, options) => {
//         const actions = []
        
//         if (selection.text) {
//             actions.push({
//                 name: "Capitalize",  // default to extension name?
//                 icon: "star.svg",   // default to extension icon?                
//                 code: capitalize
//             })
//         }
    
//         // if (context?.pasteAvailable) {
//         //     actions.push({
//         //         title: "Paste Plain",
//         //         code: () => {
//         //             popclip.paste(popclip.getPasteboardText())                    
//         //         }
//         //     })

//         //     actions.push({
//         //         title: "⌫",
//         //         code: () => {
//         //             popclip.pressKeyCode(51) // delete             
//         //         }
//         //     })
//         // }

//         return actions
//     }
// }

// const testSelection = { text: "mytext" }
// print(extension.populate(testSelection)[0].code(testSelection))