/// <reference path="../../popclip.d.ts" />
import slugify = require('voca/slugify');  
define(function () {
    const extension: Extension = {
        action(selection) {      
            popclip.pasteText(slugify(selection.text, true));
        }
    }
    return extension
})