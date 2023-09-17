"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
const actions = () => {
    if (popclip.context.appIdentifier.length > 0) {
        return [{
                title: popclip.context.appIdentifier,
                code() {
                    popclip.copyText(popclip.context.appIdentifier);
                }
            }];
    }
};
exports.actions = actions;
