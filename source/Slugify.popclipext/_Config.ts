/// <reference path="../../popclip.d.ts" />
import slugify = require('voca/slugify');  
define(function () {
    const extension: Extension = {
        identifier: "com.pilotmoon.popclip.extension.slugify",
        name: "Slugify",
        icon: "slug.png",
        action(selection) {      
            popclip.pasteText(slugify(selection.text, true));
        }
    }
    return extension
})