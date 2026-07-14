// #popclip
// name: Paste and Match Style
// identifier: com.pilotmoon.popclip.extension.pasteplain
// description: Paste as plain text only, without formatting.
// icon: paste-equal.png
// show as: text
// requirements: [paste]
// popclipVersion: 5155
defineExtension({
  action: {
    title: `${util.localize("Paste")} =`,
    code() {
      popclip.pasteText(pasteboard.text);
    },
  },
});
