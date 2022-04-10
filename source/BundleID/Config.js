define({
    actions() {
        if (popclip.context.appIdentifier) {
            return [{
                title: popclip.context.appIdentifier,
                code() {
                    popclip.copyText(popclip.context.appIdentifier);
                }
            }];
        }            
    },
});


