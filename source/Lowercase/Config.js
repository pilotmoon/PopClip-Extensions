define({
    identifier: "com.pilotmoon.popclip.extension.lowercase",
    name: "Lowercase",
    icon: "text:[[ab]]",
    action: (selection) => {
        popclip.pasteText(selection.text.toLowerCase());
    },
})