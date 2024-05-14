// #popclip
// name: Freeform
// identifier: com.pilotmoon.popclip.extension.freeform
// description: Send the selected text to Freeform.
// icon: iconify:ph:shapes
// popclip version: 4586

export function action(input: Input) {
	let item: string | RichString | { url: string };
	if (popclip.input.isUrl) {
		item = { url: input.data.urls[0] };
	} else {
		item = input.text;
	}
	popclip.share("com.apple.freeform.sharingextension", [item]);
}
