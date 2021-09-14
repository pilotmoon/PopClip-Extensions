define({
    identifier: "com.pilotmoon.popclip.extension.bundleid",
    name: "Bundle ID",
    populate: (_selection, context) => {
        if (context.appIdentifier) {
            return [{
                name: context.appIdentifier,  // default to extension name?                    
                code: () => {
                    popclip.copyText(context.appIdentifier);
                }
            }];
        }            
    },
});


