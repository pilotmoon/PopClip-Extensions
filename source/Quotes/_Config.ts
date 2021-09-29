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

function makeIcon(style: string) {
    return `[[${style[0]}${style[2]}]]`
}

define({
    options: styles.map((style, index) => {
        return {
            identifier: `style-${index}`,
            label: style,
            type: "boolean",
            icon: makeIcon(style), // generate square outlined icon
            defaultValue: index?false:true
        }
    }),
    actions(selection, context, options) {
        if (selection.text) {
            const actions: Action[] = []
            styles.forEach((style, index) => {
                if (options[`style-${index}`]) {
                    actions.push({
                        title: styles[index],
                        icon: makeIcon(style), // generate square outlined icon
                        code: (selection) => popclip.pasteText(style[0] + selection.text + style[2])
                    })
                }                
            })
            return actions
        }
    }
} as ExtensionDefinition);