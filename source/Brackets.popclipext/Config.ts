// #popclip
// name: Brackets
// identifier: com.pilotmoon.popclip.extension.brackets
// description: 'Put brackets around the selected text, choosing from (), [], {}, <> and //.'
// popclipVersion: 4586
// entitlements: [dynamic]
// icon: monospaced ()

const styles = ["(round)", "[square]", "{curly}", "<angle>", "/regex/"];

function makeIcon(index: number): string {
	return [
		"monospaced ()",
		"monospaced []",
		"monospaced {}",
		"monospaced <>",
		"monospaced //",
	][index];
}

function makeIdentifier(index: number): string {
	return `style-${index}`;
}

defineExtension({
	options: styles.map((style, index) => {
		return {
			identifier: makeIdentifier(index),
			label: style,
			type: "boolean",
			icon: makeIcon(index),
			defaultValue: !(index > 0),
		};
	}),
	actions: function (input, options) {
		if (input.text) {
			return styles
				.map((style, index) => {
					const action: Action = {
						title: styles[index],
						icon: makeIcon(index),
						code: (input) => {
							popclip.pasteText(style[0] + input.text + style.at(-1));
						},
					};
					return action;
				})
				.filter((_, index) => options[makeIdentifier(index)]);
		}
	},
});
