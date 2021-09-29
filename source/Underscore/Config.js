let {preserveEndSpace, replaceSpaces} = require('utils.js');
define({
    actions: (selection) => {
        let result = preserveEndSpace(selection.text, (text) => replaceSpaces(text, '_'));
        if (result !== selection.text) {
            return () => popclip.pasteText(result);
        }
    }
});
