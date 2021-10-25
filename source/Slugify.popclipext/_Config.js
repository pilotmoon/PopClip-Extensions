"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../popclip.d.ts" />
const slugify = require("voca/slugify");
define(function () {
    const extension = {
        action(selection) {
            popclip.pasteText(slugify(selection.text, true));
        }
    };
    return extension;
});
