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

define({
    options: styles.map((style, index) => {
        return {
            identifier: `style-${index}`,
            label: style,
            type: "boolean",
            defaultValue: index?false:true
        }
    }),
    actions(selection, context, options) {
        if (selection.text) {
            const actions: Action[] = []
            styles.forEach((style, index) => {
                if (options[`style-${index}`]) {
                    let before=style[0]
                    let after=style[2]
                    actions.push({
                        title: styles[index],
                        icon: `[[${before}${after}]]`, // generate square outlined icon
                        code: (selection) => popclip.pasteText(before + selection.text + after)
                    })
                }                
            })
            return actions
        }
    }
} as ExtensionDefinition);