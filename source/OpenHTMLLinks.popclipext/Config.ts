/// <reference path="../../popclip-next.d.ts" />
/**
 * "Open HTML Links" extension for PopClip
 * @author Nick Moore
 * @module OpenHTMLLinks
 */
import { parseHTML } from "linkedom";
/**
 * Extracts the the "href" properties of all the links in an HTML document.
 * @param html HTML source code to scan
 * @returns String array of discovered links
 */
export function extractLinks(html: string): string[] {
    const { document } = parseHTML(html);
    var links = document.getElementsByTagName('a');
    links = links.map((element) => element.getAttribute('href'));
    return links.filter((link) => typeof link === 'string');
}
defineExtension({
    action(selection) {        
        /* Note that selection.html is not available until we are inside the action function.
        So we can't filter the action availbility by the presence of a link. */
        const links = extractLinks(selection.html)
        if (links.length > 0) {
            links.forEach((link) => {
                popclip.openUrl(link)
            })
        }
    },
    flags: {
        captureHtml: true
    }
})