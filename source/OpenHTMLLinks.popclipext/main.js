"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../popclip-next.d.ts" />
/**
 * "Open HTML Links" extension for PopClip
 * @author Nick Moore
 * @module OpenHTMLLinks
 */
var extractLinks_1 = require("./extractLinks");
defineExtension({
    action: function (selection) {
        /* Note that selection.html is not available until we are inside the action function.
        So we can't filter the action availability by the presence of a link. */
        var links = (0, extractLinks_1.extractLinks)(selection.html);
        if (links.length > 0) {
            links.forEach(function (link) {
                popclip.openUrl(link);
            });
        }
    },
    flags: {
        captureHtml: true
    }
});
