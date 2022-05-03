"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
const actions = (selection) => {
    const lineCount = selection.text.split(/\r\n|\r|\n/).length;
    const action = {
        title: util.localize(lineCount.toString() + ' ' + util.localize(lineCount > 1 ? 'Lines' : 'Line'))
    };
    return action;
};
exports.actions = actions;
