define(function () {
    const extension = {
        action(selection) {
            const separator = (popclip.modifierKeys & util.constant.MODIFIER_OPTION) !== 0 ? '' : '\n';
            if ((popclip.modifierKeys & util.constant.MODIFIER_SHIFT) !== 0) {
                pasteboard.text = selection.text.trim() + separator + pasteboard.text.trim();
            }
            else {
                pasteboard.text = pasteboard.text.trim() + separator + selection.text.trim();
            }
        }
    };
    return extension;
});
