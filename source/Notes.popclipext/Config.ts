// #popclip
// name: Notes
// identifier: com.pilotmoon.popclip.extension.notes
// description: Make a new note, or append to an existing note, in the Notes app.
// icon: notepad.png
// popclip version: 4586
// captureHtml: true
// captureRtf: true

export function action(input: Input) {
	let item: string | RichString | { url: string };
	if (popclip.input.isUrl) {
		item = { url: input.data.urls[0] };
	} else if (input.content["public.rtf"]) {
		item = new RichString(input.rtf, { format: "rtf" });
	} else if (popclip.input.content["public.html"]) {
		item = new RichString(input.html, { format: "html" });
	} else {
		item = input.text;
	}
	popclip.share("com.apple.Notes.SharingExtension", [item]);
}
