"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = exports.htmlToMarkdown = void 0;
const linkedom_1 = require("linkedom");
const turndown_1 = require("turndown");
const _joplin_turndown_plugin_gfm_1 = require("./@joplin+turndown-plugin-gfm");
function htmlToMarkdown(html) {
    // generate DOM object from HTML
    function JSDOM(html) { return linkedom_1.default.parseHTML(html); } // facade to work like jsdom
    const { document } = new JSDOM(html);
    const turndownService = new turndown_1.default({ headingStyle: 'atx' });
    turndownService.use(_joplin_turndown_plugin_gfm_1.default.gfm);
    return turndownService.turndown(document);
}
exports.htmlToMarkdown = htmlToMarkdown;
const action = (input) => {
    return htmlToMarkdown(input.html);
};
exports.action = action;
