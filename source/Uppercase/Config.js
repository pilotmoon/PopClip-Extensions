var Extension = {
    identifier: "com.pilotmoon.popclip.extension.uppercase",
    name: "Uppercase",
    icon: "text:[[A]]",
    passHtml: true,
    code: (selection, context, options) => {
        context.paste(selection.text.toUpperCase())
    },
}