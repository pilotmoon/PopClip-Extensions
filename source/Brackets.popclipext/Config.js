define(function () {
    var styles = [
        '(round)',
        '[square]',
        '{curly}',
        '<angle>'
    ];
    function makeIcon(index) {
        return ['brackets-round.png', 'brackets-square.png', 'brackets-curly.png', 'brackets-angle.png'][index];
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
                icon: makeIcon(index),
                defaultValue: !(index > 0)
            };
        }),
        actions: function (selection, context, options) {
            if (selection.text.length > 0) {
                return styles.filter(function (style, index) { return options[makeIdentifier(index)]; }).map(function (style, index) {
                    return {
                        title: styles[index],
                        icon: makeIcon(index),
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
