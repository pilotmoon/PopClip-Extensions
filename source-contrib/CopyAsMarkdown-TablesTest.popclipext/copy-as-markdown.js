"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = exports.htmlToMarkdown = void 0;
const linkedom = require("@popclip/linkedom");
const TurndownService = require("@popclip/turndown");
const turndownPluginGfm = require("./@joplin+turndown-plugin-gfm");
function htmlToMarkdown(html) {
    // generate DOM object from HTML
    function JSDOM(html) { return linkedom.parseHTML(html); } // facade to work like jsdom
    const { document } = new JSDOM(html);
    const options = { headingStyle: 'atx' };
    var turndownService = new TurndownService(options);
    turndownService.use(turndownPluginGfm.gfm);
    return turndownService.turndown(document);
}
exports.htmlToMarkdown = htmlToMarkdown;
const action = (input) => {
    return htmlToMarkdown(input.html);
};
exports.action = action;
