// #popclip
// name: Paste and Match Style
// identifier: com.pilotmoon.popclip.extension.pasteplain
// description: Paste as plain text only, without formatting.
// icon: paste-equal.png
// entitlements: [dynamic]
// popclipVersion: 4151

module.exports = {
  name: `${util.localize("Paste")} =`,
  options: [{
    identifier: "showIcon",
    type: "boolean",
    label: util.localize("Show as Icon"),
    defaultValue: false,
  }],
  actions() {
    if (popclip.context.canPaste) {
      return {
        // `undefined` will fall back to the extension's icon; `null` sets no icon
        icon: popclip.options.showIcon ? undefined : null,
        code() {
          popclip.pasteText(pasteboard.text);
        },
      };
    }
  },
};
