"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = exports.htmlToMarkdown = void 0;
const linkedom_1 = __importDefault(require("@popclip/linkedom"));
const turndown_1 = __importDefault(require("@popclip/turndown"));
const _joplin_turndown_plugin_gfm_1 = __importDefault(require("./@joplin+turndown-plugin-gfm"));
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
