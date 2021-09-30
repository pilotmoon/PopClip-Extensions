/// <reference path="../../popclip.d.ts" />
define(() => {
    const extension: ExtensionDefinition = {        
        actions(selection, _context, options) {
            const result: ActionDefinition[] = []
            const emails=selection.data.emails;
            if (options["enable-at"] && emails.length > 0) {
                result.push({
                    title: emails.length==1?"New email to address":"New email to addresses",
                    icon: "at.png",
                    code: function() {      
                        if (popclip.modifierKeys & util.constant.MODIFIER_SHIFT) {
                            // multiple recipients
                            popclip.openUrl("mailto:" + emails.map(encodeURIComponent).join())
                        }   
                        else {
                            // one email to each address
                            emails.forEach((email) => popclip.openUrl("mailto:" + encodeURIComponent(email)))                        
                        }                               
                    }
                });
            }
            if (options["enable-body"] && selection.text) {
                result.push({
                    title: "New email with text",
                    icon: "envelope.png",
                    code: function() {
                        popclip.openUrl("mailto:" + encodeURIComponent(options["default"]) + "?body=" + encodeURIComponent(selection.markdown))
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
