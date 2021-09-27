let jsutils=require('utils.js');
define({
    action: (selection) => {
        popclip.pasteText(jsutils.preserveEndSpace(selection.text, (text) => jsutils.replaceSpaces(text, '-')));
    }
});
