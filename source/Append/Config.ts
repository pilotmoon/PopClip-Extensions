/// <reference path="../../popclip.d.ts" />
define(function () {
    const extension: ExtensionDefinition = {
        action(selection) {
            const separator = util.constant.MODIFIER_SHIFT ? "" : "\n"
            if (popclip.modifierKeys&(util.constant.MODIFIER_OPTION)) {
                pasteboard.text=selection.text.trim() + separator + pasteboard.text.trim();
            }
            else {
                pasteboard.text=pasteboard.text.trim() + separator + selection.text.trim();
            }
        }
    }    
    return extension
})