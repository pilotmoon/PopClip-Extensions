// #popclip
// name: URL Encode
// identifier: com.pilotmoon.popclip.extension.urlencode
// description: Percent-encode or decode the selected text.
// icon: square %
// popclipVersion: 4151

exports.actions = [{
  icon: "square %",
  title: "URL-encode",
  code: (selection) => {
    popclip.pasteText(encodeURIComponent(selection.text));
  },
}, {
  icon: "square filled %",
  title: "URL-decode",
  regex: /%[0-9A-Fa-f][0-9A-Fa-f]/,
  code: (input) => {
    popclip.pasteText(decodeURIComponent(input.text));
  },
}];
