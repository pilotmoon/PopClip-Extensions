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
function makeIcon(style) {
    return "[[" + style[0] + style[2] + "]]";
}
define({
    options: styles.map(function (style, index) {
        return {
            identifier: "style-" + index,
            label: style,
            type: "boolean",
            icon: makeIcon(style),
            defaultValue: index ? false : true
        };
    }),
    actions: function (selection, context, options) {
        if (selection.text) {
            var actions_1 = [];
            styles.forEach(function (style, index) {
                if (options["style-" + index]) {
                    actions_1.push({
                        title: styles[index],
                        icon: makeIcon(style),
                        code: function (selection) { return popclip.pasteText(style[0] + selection.text + style[2]); }
                    });
                }
            });
            return actions_1;
        }
    }
});
