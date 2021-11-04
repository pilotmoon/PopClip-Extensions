define(function () {
    // the possible quotes styles
    const styles = [
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
        return `[[${style[0]}${style[2]}]]`;
    }
    function makeIdentifier(index) {
        return `style-${index}`;
    }
    const extension = {
        options: styles.map((style, index) => {
            return {
                identifier: makeIdentifier(index),
                label: style,
                type: 'boolean',
                icon: makeIcon(style),
                defaultValue: !(index > 0)
            };
        }),
        actions(selection, options) {
            if (selection.text.length > 0) {
                return styles.filter((style, index) => options[makeIdentifier(index)]).map((style, index) => {
                    return {
                        title: styles[index],
                        icon: makeIcon(style),
                        code: (selection) => popclip.pasteText(style[0] + selection.text + style[2])
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
