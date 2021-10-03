"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../popclip.d.ts" />
var utils = require("../../lib/utils");
define(function () {
    var extension = {
        actions: function (selection) {
            var result = utils.preserveEndSpace(selection.text, function (text) { return utils.replaceSpaces(text, '_'); });
            if (result !== selection.text) {
                return function () { return popclip.pasteText(result); };
            }
        }
    };
    return extension;
});
