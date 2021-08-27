var Extension = {
    identifier: "com.pilotmoon.popclip.extension.lowercase",
    name: "Lowercase",
    icon: "[[ab]]",
    passHtml: true,
    code: (selection, context, options) => {
        context.paste(selection.text.toLowerCase())
    },
}