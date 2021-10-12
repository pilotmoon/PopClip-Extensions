define(function () {
    var extension = {
        actions: function (selection, _context, options) {
            var actions = [];
            if (selection.text.length > 0) {
                actions.push({
                    icon: '[64]',
                    title: 'Base64-encode',
                    code: function () {
                        popclip.pasteText(util.base64Encode(selection.text, {
                            urlSafe: options.variant === 'url',
                            trimmed: options.trim === true
                        }));
                    }
                });
            }
            if (/^[A-Za-z0-9+_\-/]+=?=?$/.test(selection.text)) {
                // this looks like base64-encoded text, so offer the decode function
                actions.push({
                    icon: '[[64]]',
                    title: 'Base64-decode',
                    code: function () {
                        var decoded = util.base64Decode(selection.text);
                        popclip.pasteText(decoded !== null && decoded !== void 0 ? decoded : '<Base64: Non-UTF8 result>');
                    }
                });
            }
            return actions;
        }
    };
    return extension;
});
