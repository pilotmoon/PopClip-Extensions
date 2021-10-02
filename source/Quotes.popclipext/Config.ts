/// <reference path="../../popclip.d.ts" />
define(function () {
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

    // generate square icon
    function makeIcon(style: string) {
        return `[[${style[0]}${style[2]}]]`
    }

    function makeIdentifier(index: number) {
        return `style-${index}`
    }

    let extension: Extension = {
        options: styles.map((style, index) => {
            return {
                identifier: makeIdentifier(index),
                label: style,
                type: "boolean",
                icon: makeIcon(style),
                defaultValue: index>0?false:true
            }
        }),
        actions(selection, context, options) {
            if (selection.text) {            
                return styles.filter((style, index) => options[makeIdentifier(index)]).map((style, index) => {
                    return {
                        title: styles[index],
                        icon: makeIcon(style),
                        code: (selection) => popclip.pasteText(style[0] + selection.text + style[2])
                    }            
                })
            }
        }
    }
    
    return extension;
});