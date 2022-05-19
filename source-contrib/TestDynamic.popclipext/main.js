"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
const memory = [];
const actions = (selection) => {
    memory.push(selection.text);
    print('in populator with ' + memory.join(','));
    return () => {
        print('dynamic hello');
        return null;
    };
};
exports.actions = actions;
