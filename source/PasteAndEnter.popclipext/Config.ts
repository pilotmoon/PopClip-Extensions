// #popclip
// name: Paste and Enter
// identifier: com.pilotmoon.popclip.extension.pasteandenter
// description: PopClip will paste, then press the Return (↵) key for you.
// icon: paste-enter.png
// show as: text
// requirements: [paste]
// popclipVersion: 5155
defineExtension({
  action: {
    title: `${util.localize("Paste")} + ↵`,
    code() {
      if (popclip.modifiers.shift) {
        popclip.pasteText(pasteboard.text);
      } else {
        popclip.performCommand("paste");
      }
      popclip.pressKey(util.constant.KEY_RETURN);
    },
  },
});
