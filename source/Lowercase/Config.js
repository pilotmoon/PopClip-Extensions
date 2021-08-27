var Extension = {
    identifier: "com.pilotmoon.popclip.extension.lowercase",
    name: "Lowercase",
    icon: "text:[[ab]]",
    code: (selection, context) => {
        context.paste(selection.text.toLowerCase())
    }
}