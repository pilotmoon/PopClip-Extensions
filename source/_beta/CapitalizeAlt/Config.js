define(() => {
    const Sugar=require('sugar');
    return {
        identifier: "com.pilotmoon.popclip.extension.capitalize",
        name: "Capitalize",
        icon: "text:[[Ab]]",
        code: (selection) => {             
            popclip.pasteText(Sugar.String(selection.text).capitalize(true));
        }
    };
})