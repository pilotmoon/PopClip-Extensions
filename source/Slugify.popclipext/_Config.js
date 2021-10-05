"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../popclip.d.ts" />
var slugify = require("voca/slugify");
define(function () {
    var extension = {
        action: function (selection) {
            popclip.pasteText(slugify(selection.text, true));
        }
    };
    return extension;
});
