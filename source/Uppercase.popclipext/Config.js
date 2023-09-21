define({
    identifier: "com.pilotmoon.popclip.extension.uppercase",
    name: "Uppercase",
    icon: "square filled AB",
    action: (selection) => {
        popclip.pasteText(selection.text.toUpperCase());
    }
})