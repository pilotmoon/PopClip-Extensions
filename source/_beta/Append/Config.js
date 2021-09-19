define({
    action: (selection, context) => {
        if (popclip.modifierKeys&(Util.Constant.MODIFIER_OPTION|Util.Constant.MODIFIER_SHIFT)) {
            pasteboard.text=selection.text.trim() + "\n" + pasteboard.text.trim();
        }
        else {
            pasteboard.text=pasteboard.text.trim() + "\n" + selection.text.trim();
        }
    }
})