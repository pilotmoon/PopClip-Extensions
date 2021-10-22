"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = void 0;
var action = function () {
    print(pasteboard.content);
    pasteboard.content = { 'public.utf8-plain-text': 'fish', 'public.html': '<b>fish</b>' };
};
exports.action = action;
