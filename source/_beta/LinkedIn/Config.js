const personName = require('personName.js');
define({
    identifier: "com.pilotmoon.popclip.extension.linkedin",
    name: "LinkedIn",
    icon: "in.png",    
    populate: (selection) => {        
        const name = personName(selection.text);
        if (name) {
            return {
                code: (selection) => {
                    let [first, last] = name.map(encodeURIComponent);
                    popclip.openUrl(`https://www.linkedin.com/pub/dir/?first=${first}+&last=${last}&search=Go`);
                }                
            };                
        }
    },
    appVersion: 3476,
});