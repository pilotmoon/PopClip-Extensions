define({
    identifier: "com.pilotmoon.popclip.extension.uppercase",
    name: "Uppercase",
    icon: "text:[[AB]]",
    action: (selection) => {
        popclip.pasteText(selection.text.toUpperCase());
    }
})