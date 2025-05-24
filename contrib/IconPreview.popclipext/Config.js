// #popclip
// name: Icon Preview
// popclipVersion: 3785
// identifier: com.pilotmoon.popclip.extension.icon-preview
// entitlements: [dynamic]
// language: javascript
// module: true
exports.actions = (selection) => {
	return {
		icon: selection.text
	}
}