/// <reference path="../../popclip.d.ts" />
define(function () {
    // the possible quotes styles
    var styles = [
        "“…”",
        "‘…’",
        "\"\u2026\"",
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
    function makeIcon(style) {
        return "[[" + style[0] + style[2] + "]]";
    }
    function makeIdentifier(index) {
        return "style-" + index;
    }
    var extension = {
        options: styles.map(function (style, index) {
            return {
                identifier: makeIdentifier(index),
                label: style,
                type: "boolean",
                icon: makeIcon(style),
                defaultValue: index > 0 ? false : true
            };
        }),
        actions: function (selection, context, options) {
            if (selection.text) {
                return styles.filter(function (style, index) { return options[makeIdentifier(index)]; }).map(function (style, index) {
                    return {
                        title: styles[index],
                        icon: makeIcon(style),
                        code: function (selection) { return popclip.pasteText(style[0] + selection.text + style[2]); }
                    };
                });
            }
        }
    };
    return extension;
});
