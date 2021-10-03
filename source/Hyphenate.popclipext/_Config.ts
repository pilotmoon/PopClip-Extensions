/// <reference path="../../popclip.d.ts" />
import utils = require('../../lib/utils');
define(() => {
    let extension: Extension = {
        actions: (selection) => {
            let result = utils.preserveEndSpace(selection.text, (text) => utils.replaceSpaces(text, '-'));
            if (result !== selection.text) {
                return () => popclip.pasteText(result);
            }
        }
    }
    return extension;
});