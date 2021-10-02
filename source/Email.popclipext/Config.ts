/// <reference path="../../popclip.d.ts" />
define(() => {
    const extension: Extension = {        
        actions(selection, context, options) {
            const result: Action[] = []
            const emails=selection.data.emails;
            if (options["enable-at"] && emails.length > 0) {
                result.push({
                    title: emails.length==1?`New email to ${emails[0]}`:`New email to ${emails.length} addresses`,
                    icon: "at.png",
                    code: function() {      
                        if (popclip.modifierKeys & util.constant.MODIFIER_SHIFT) {
                            // multiple recipients
                            popclip.openUrl("mailto:" + emails.join())
                        }   
                        else {
                            // one email to each address
                            emails.forEach((email) => popclip.openUrl("mailto:" + email))                        
                        }                               
                    }
                });
            }
            if (options["enable-body"] && selection.text) {
                result.push({
                    title: "New email with text",
                    icon: "envelope.png",
                    code: function() {
                        let body = selection.markdown;
                        if (options["source"]) {
                            body += "\n\n" + context.browserUrl;
                        }
                        popclip.openUrl("mailto:" + options["default"] + "?body=" + encodeURIComponent(body))
                    },
                    flags: {
                        captureHtml: true
                    }
                });
            }
            return result;
        }
    }
    return extension;
});
