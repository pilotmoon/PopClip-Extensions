import { escapeUTF8, encodeHTML, decodeHTML } from "entities";
const extension: Extension = {
	options: [
		{
			identifier: "mode",
			label: "Encoding Mode",
			type: "multiple",
			values: ["specialChars", "nonAsciiPrintable"],
			valueLabels: [
				"HTML special characters only (<>&\"')",
				"All non-ASCII characters",
			],
		},
	],
	actions: [
		{
			title: "HTML-encode",
			code: (input, options) => {
				let encoded: string;
				if (options.mode === "specialChars") {
					encoded = escapeUTF8(input.text);
				} else {
					encoded = encodeHTML(input.text);
				}
				popclip.pasteText(encoded);
			},
		},
		{
			icon: "square monospaced &;",
			title: "HTML-decode",
			regex: /&(\w+|#\d+);/,
			code: (selection) => {
				popclip.pasteText(decodeHTML(selection.text));
			},
		},
	],
};
export default extension;
