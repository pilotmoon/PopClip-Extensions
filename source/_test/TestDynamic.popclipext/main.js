"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
var memory = [];
var actions = function (selection) {
    memory.push(selection.text);
    print('in populator with ' + memory.join(','));
    return function () {
        print('dynamic hello');
    };
};
exports.actions = actions;
