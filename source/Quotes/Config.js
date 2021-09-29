/// <reference path="../../popclip.d.ts" />
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
define({
    options: styles.map(function (style, index) {
        return {
            identifier: "style-" + index,
            label: style,
            type: "boolean",
            defaultValue: index ? false : true
        };
    }),
    actions: function (selection, context, options) {
        if (selection.text) {
            var actions_1 = [];
            styles.forEach(function (style, index) {
                if (options["style-" + index]) {
                    var before_1 = style[0];
                    var after_1 = style[2];
                    actions_1.push({
                        title: styles[index],
                        icon: "[" + before_1 + after_1 + "]",
                        code: function (selection) { return popclip.pasteText(before_1 + selection.text + after_1); }
                    });
                }
            });
            return actions_1;
        }
    }
});
