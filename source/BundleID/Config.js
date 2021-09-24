define({
    actions: (_selection, context) => {
        if (context.appIdentifier) {
            return [{
                title: context.appIdentifier,
                code: () => {
                    popclip.copyText(context.appIdentifier);
                }
            }];
        }            
    },
});


