let personName = require('personName.js');
define({
    identifier: "com.pilotmoon.popclip.extension.linkedin",
    name: "LinkedIn",
    icon: "in.png",    
    actions: (selection) => {        
        let parts = personName(selection.text);
        if (parts) { // only return an action if the regex matches
            return (selection) => {   
                let [first, last] = parts.map(encodeURIComponent);
                popclip.openUrl(`https://www.linkedin.com/pub/dir/?first=${first}+&last=${last}&search=Go`);
            };
        }
    },
    appVersion: 3476,
});