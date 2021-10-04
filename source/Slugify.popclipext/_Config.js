"use strict";
exports.__esModule = true;
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
