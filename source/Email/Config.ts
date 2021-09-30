/// <reference path="../../popclip.d.ts" />
define({
    actions() {
        const result: ActionDefinition[] = []
        const emails=popclip.selection.data.emails;
        if (popclip.options["enable-at"] && emails.length > 0) {
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
        if (popclip.options["enable-body"] && popclip.selection.text) {
            result.push({
                title: "New email with text",
                icon: "envelope.png",
                code: function() {
                    popclip.openUrl("mailto:" + encodeURIComponent(popclip.options["default"]) + "?body=" + encodeURIComponent(popclip.selection.text))
                }
            });
        }
        return result;
    }
});
