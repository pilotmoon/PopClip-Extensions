// #popclip
// name: Paste and Enter
// identifier: com.pilotmoon.popclip.extension.pasteandenter
// description: PopClip will paste, then press the Return (↵) key for you.
// icon: paste-enter.png
// entitlements: [dynamic]
// popclipVersion: 5247
module.exports = {
  showAs: "text",
  dynamicAction() {
    if (popclip.context.canPaste) {
      return {
        title: `${util.localize("Paste")} + ↵`,
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
