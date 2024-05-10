// #popclip
// name: URL Encode
// identifier: com.pilotmoon.popclip.extension.urlencode
// description: Percent-encode or decode the selected text.
// icon: square %
// popclipVersion: 4151
// entitlements: [dynamic]
// language: javascript
// module: true

exports.actions = (input) => {
  let actions = [];
  if (input.text) {
    // offer to encode any nonzero text
    actions.push({
      icon: "square %",
      title: "URL-encode",
      code: (selection) => {
        popclip.pasteText(encodeURIComponent(selection.text));
      },
    });
  }
  if (/%[0-9A-Fa-f][0-9A-Fa-f]/.test(input.text)) {
    // this looks%20like%20percent-encoded text, so offer the decode function
    actions.push({
      icon: "square filled %",
      title: "URL-decode",
      code: (input) => {
        popclip.pasteText(decodeURIComponent(input.text));
      },
    });
  }
  return actions;
};
