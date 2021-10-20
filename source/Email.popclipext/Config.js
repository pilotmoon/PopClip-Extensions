"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
var actions = function (selection, context, options) {
    var result = [];
    var emails = selection.data.emails;
    if (options['enable-at'] && emails.length > 0) {
        result.push({
            title: emails.length === 1 ? "New email to " + emails[0] : "New email to " + emails.length + " addresses",
            icon: 'at.png',
            code: function () {
                if ((popclip.modifierKeys & util.constant.MODIFIER_SHIFT) !== 0) {
                    // multiple recipients
                    popclip.openUrl('mailto:' + emails.join());
                }
                else {
                    // one email to each address
                    emails.forEach(function (email) { return popclip.openUrl('mailto:' + email); });
                }
            }
        });
    }
    if (options['enable-body'] && selection.text.length > 0) {
        result.push({
            title: 'New email with text',
            icon: 'envelope.png',
            code: function () {
                var body = selection.markdown;
                if (options.source) {
                    body += '\n\n' + context.browserUrl;
                }
                popclip.openUrl('mailto:' + options.default + '?body=' + encodeURIComponent(body));
            },
            flags: {
                captureHtml: true
            }
        });
    }
    return result;
};
exports.actions = actions;
