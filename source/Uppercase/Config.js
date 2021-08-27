var Extension = {
    identifier: "com.pilotmoon.popclip.extension.uppercase",
    name: "Uppercase",
    icon: "text:[[AB]]",
    code: (selection, context) => {
        context.paste(selection.text.toUpperCase())
    }
}