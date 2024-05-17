// #popclip
// popclip version: 4151
// identifier: com.pilotmoon.popclip.extension.rot13
// name: ROT13
// icon: square filled R13
// description: Apply the ROT13 cipher to the text.

const rot13Cipher = require("rot13-cipher");
exports.action = function (input) {
  popclip.pasteText(rot13Cipher(input.text));
};
