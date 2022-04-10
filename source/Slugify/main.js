"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const voca_1 = require("voca");
const action = (selection) => {
    popclip.pasteText((0, voca_1.slugify)(selection.text));
};
exports.action = action;
