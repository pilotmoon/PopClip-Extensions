define({
    identifier: "com.pilotmoon.popclip.extension.uppercase",
    name: "Uppercase",
    icon: "text:[[AB]]",
    code: (selection) => {
        popclip.pasteText(selection.text.toUpperCase());
    }
})