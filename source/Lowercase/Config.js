// Experimental JavaScript format, subject to change.
var extension = {
    identifier: "com.pilotmoon.popclip.extension.lowercase",
    name: "Lowercase",
    icon: "text:[[ab]]",
    code: (selection) => {
        popclip.paste(selection.text.toLowerCase())
    }
}