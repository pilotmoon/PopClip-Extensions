"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions = () => {
    if (popclip.context.appIdentifier.length > 0) {
        return [{
                title: popclip.context.appIdentifier,
                code() {
                    popclip.copyText(popclip.context.appIdentifier);
                    return null;
                }
            }];
    }
    else {
        return null;
    }
};
exports.default = { actions };
