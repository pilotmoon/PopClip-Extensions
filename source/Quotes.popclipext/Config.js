define(function () {
    // the possible quotes styles
    var styles = [
        '“…”',
        '‘…’',
        '"…"',
        "'…'",
        '`…`',
        '«…»',
        '‹…›',
        '»…«',
        '›…‹',
        '「…」',
        '『…』',
        '„…“',
        '‚…‘'
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
                type: 'boolean',
                icon: makeIcon(style),
                defaultValue: !(index > 0)
            };
        }),
        actions: function (selection, context, options) {
            if (selection.text.length > 0) {
                return styles.filter(function (style, index) { return options[makeIdentifier(index)]; }).map(function (style, index) {
                    return {
                        title: styles[index],
                        icon: makeIcon(style),
                        code: function (selection) { return popclip.pasteText(style[0] + selection.text + style[2]); }
                    };
                });
            }
            else {
                return null;
            }
        }
    };
    return extension;
});
