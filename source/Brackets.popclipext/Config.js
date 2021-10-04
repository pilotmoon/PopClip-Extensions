/// <reference path="../../popclip.d.ts" />
define(function () {
    var styles = [
        "(round)",
        "[square]",
        "{curly}",
        "<angle>",
    ];
    function makeIcon(index) {
        return ["brackets-round.png", "brackets-square.png", "brackets-curly.png", "brackets-angle.png"][index];
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
                icon: makeIcon(index),
                defaultValue: index > 0 ? false : true
            };
        }),
        actions: function (selection, context, options) {
            if (selection.text) {
                return styles.map(function (style, index) {
                    return {
                        title: style,
                        icon: makeIcon(index),
                        code: function (selection) {
                            popclip.pasteText(style[0] + selection.text + style[style.length - 1]);
                        }
                    };
                }).filter(function (style, index) { return options[makeIdentifier(index)]; });
            }
        }
    };
    return extension;
});
