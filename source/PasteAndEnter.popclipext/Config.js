// #popclip
// name: Paste and Enter
// identifier: com.pilotmoon.popclip.extension.pasteandenter
// description: PopClip will paste, then press the Return (↵) key for you.
// icon: paste-enter.png
// entitlements: [dynamic]
// popclipVersion: 4151

module.exports = {
  name: `${util.localize("Paste")} + ↵`,
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
          if (popclip.modifiers.shift) {
            popclip.pasteText(pasteboard.text);
          } else {
            popclip.performCommand("paste");
          }
          popclip.pressKey(util.constant.KEY_RETURN);
        },
      };
    }
  },
};
