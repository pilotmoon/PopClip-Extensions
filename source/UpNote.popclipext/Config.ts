// #popclip
// name: UpNote
// identifier: com.pilotmoon.popclip.extension.upnote
// description: Create a new note in UpNote with the selected text.
// app: { name: UpNote, link: https://getupnote.com/ }
// popclipVersion: 4586
// icon: upnote.svg

/*
Tech Notes
- URL Scheme info: <https://help.getupnote.com/more/x-callback-url-endpoints>
- URL scheme to create a new note:
  `upnote://x-callback-url/note/new?title=[title]&text=[text]&notebook=[notebook]&new_window=[true|false]&markdown=[true|false]`
 */
function newNote(content: string, browserUrl: string) {
	if (browserUrl) {
		content += `\n\n[source](${browserUrl})`;
	}
	let url = new URL("upnote://x-callback-url/note/new");
	url.searchParams.set("text", content);
	url.searchParams.set("markdown", "true");
	popclip.openUrl(url.href);
}

export const action: Action = {
	captureHtml: true,
	code(input, _, context) {
		newNote(input.markdown, context.browserUrl);
	},
};
