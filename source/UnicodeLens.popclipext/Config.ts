// #popclip
// name: Unicode Lens
// identifier: com.pilotmoon.popclip.extension.unicode-lens
// description: View the underlying Unicode code points of selected text.
// popclipVersion: 4586
// icon: iconify:ic:baseline-lens-blur

export const action: Action = {
	code(input) {
		popclip.showText(codepoints(input.text), { preview: true });
	},
};
function codepoints(text: string) {
	return [...text].map((cp) => cp.codePointAt(0)?.toString(16)).join(" ");
}
export function test() {
	print(codepoints("Hello, world!"));
	print(codepoints("À"));
	print(codepoints("👋"));
}
