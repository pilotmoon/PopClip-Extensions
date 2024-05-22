import { parseHTML } from "linkedom";

/**
 * Extracts the the "href" properties of all the links in an HTML document.
 * @param html HTML source code to scan
 * @returns String array of discovered links
 */
export function extractLinks(html: string): string[] {
	const { document } = parseHTML(html);
	const elements = document.getElementsByTagName("a");
	const links: string[] = [];
	for (const element of elements) {
		const href = element.getAttribute("href");
		if (typeof href === "string") {
			links.push(href);
		}
	}
	return links;
}
