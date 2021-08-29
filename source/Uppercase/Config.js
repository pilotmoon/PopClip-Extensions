// Experimental JavaScript format, subject to change.
var extension = {
    identifier: "com.pilotmoon.popclip.extension.uppercase",
    name: "Uppercase",
    icon: "text:[[AB]]",
    code: (selection) => {
        popclip.paste(selection.text.toUpperCase())
    }
}