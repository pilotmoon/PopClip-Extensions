"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../../lib/pcx-utils");
define(() => {
    const extension = {
        actions(selection) {
            const result = utils.preserveEndSpace(selection.text, (text) => utils.replaceSpaces(text, '_'));
            if (result !== selection.text) {
                return () => popclip.pasteText(result);
            }
        }
    };
    return extension;
});
