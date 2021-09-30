/// <reference path="../../popclip.d.ts" />
define({
    flags: {
        captureHtml: true
    },
    actions: function (selection, _context, options) {
        var result = [];
        var emails = selection.data.emails;
        if (options["enable-at"] && emails.length > 0) {
            result.push({
                title: emails.length == 1 ? "New email to address" : "New email to addresses",
                icon: "at.png",
                code: function () {
                    if (popclip.modifierKeys & util.constant.MODIFIER_SHIFT) {
                        // multiple recipients
                        popclip.openUrl("mailto:" + emails.map(encodeURIComponent).join());
                    }
                    else {
                        // one email to each address
                        emails.forEach(function (email) { return popclip.openUrl("mailto:" + encodeURIComponent(email)); });
                    }
                }
            });
        }
        if (options["enable-body"] && selection.text) {
            result.push({
                title: "New email with text",
                icon: "envelope.png",
                code: function () {
                    popclip.openUrl("mailto:" + encodeURIComponent(options["default"]) + "?body=" + encodeURIComponent(selection.markdown));
                }
            });
        }
        return result;
    }
});
