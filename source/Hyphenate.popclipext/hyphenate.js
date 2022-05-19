"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
const transform_lines_1 = require("@popclip/helpers/transform-lines");
const replace_spaces_1 = require("@popclip/helpers/replace-spaces");
const actions = (selection) => {
    const result = (0, transform_lines_1.transformLines)(selection.text, (text) => (0, replace_spaces_1.replaceSpaces)(text, '-'));
    if (result !== selection.text) {
        return () => popclip.pasteText(result);
    }
};
exports.actions = actions;
