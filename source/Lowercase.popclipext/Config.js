define({
    identifier: "com.pilotmoon.popclip.extension.lowercase",
    name: "Lowercase",
    icon: "square filled ab",
    action: (selection) => {
        popclip.pasteText(selection.text.toLowerCase());
    },
})