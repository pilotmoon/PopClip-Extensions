"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractLinks = void 0;
const linkedom_1 = require("@popclip/linkedom");
/**
 * Extracts the the "href" properties of all the links in an HTML document.
 * @param html HTML source code to scan
 * @returns String array of discovered links
 */
function extractLinks(html) {
    const { document } = (0, linkedom_1.parseHTML)(html);
    var links = document.getElementsByTagName('a');
    links = links.map((element) => element.getAttribute('href'));
    return links.filter((link) => typeof link === 'string');
}
exports.extractLinks = extractLinks;
