/// <reference path="../../popclip.d.ts" />

// the possible quotes styles
const styles = [
    "“…”",
    "‘…’",
    `"…"`,
    "'…'",
    "«…»",
    "‹…›",
    "»…«",
    "›…‹",
    "「…」",
    "『…』",
    "„…“",
    "‚…‘"
];

 // generate square outlined icon
function makeIcon(style: string) {
    return `[[${style[0]}${style[2]}]]`
}

define({
    options: styles.map((style, index) => {
        let option: OptionDefinition = {
            identifier: `style-${index}`,
            label: style,
            type: "boolean",
            icon: makeIcon(style),
            defaultValue: index?false:true
        }
        return option;
    }),
    actions(selection, context, options) {
        if (selection.text) {
            const actions: Action[] = []
            styles.forEach((style, index) => {
                if (options[`style-${index}`]) {
                    actions.push({
                        title: styles[index],
                        icon: makeIcon(style),
                        code: (selection) => popclip.pasteText(style[0] + selection.text + style[2])
                    })
                }                
            })
            return actions
        }
    }
} as ExtensionDefinition);