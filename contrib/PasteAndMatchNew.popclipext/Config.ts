// #popclip
// name: Paste and Match Style
// identifier: com.pilotmoon.popclip.extension.pasteplain
// description: Paste as plain text only, without formatting.
// icon: paste-equal.png
// entitlements: [dynamic]
// requirements: [paste]
// showAs: text
// popclipVersion: 5247
defineExtension({
  action: {
    title: `${util.localize("Paste")} =`,
    code() {
      popclip.pasteText(pasteboard.text);
    },
  },
});
