"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = void 0;
const action = () => {
    print(pasteboard.content);
    pasteboard.content = { 'public.utf8-plain-text': 'fish', 'public.html': '<b>fish</b>' };
};
exports.action = action;
