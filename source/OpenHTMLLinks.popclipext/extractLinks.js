"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractLinks = void 0;
var linkedom_1 = require("linkedom");
/**
 * Extracts the the "href" properties of all the links in an HTML document.
 * @param html HTML source code to scan
 * @returns String array of discovered links
 */
function extractLinks(html) {
    var document = (0, linkedom_1.parseHTML)(html).document;
    var links = document.getElementsByTagName('a');
    links = links.map(function (element) { return element.getAttribute('href'); });
    return links.filter(function (link) { return typeof link === 'string'; });
}
exports.extractLinks = extractLinks;
