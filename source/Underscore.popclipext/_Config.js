let {preserveEndSpace, replaceSpaces} = require('../../lib/utils.js');
define({
    actions: (selection) => {
        let result = preserveEndSpace(selection.text, (text) => replaceSpaces(text, '_'));
        if (result !== selection.text) {
            return () => popclip.pasteText(result);
        }
    }
});
