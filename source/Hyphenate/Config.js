let jsutils=require('utils.js');
define({
    actions: (selection) => {
        let result = jsutils.preserveEndSpace(selection.text, (text) => jsutils.replaceSpaces(text, '-'));
        if (result !== selection.text) {
            return () => popclip.pasteText(result);
        }
    }
});