// #popclip
// name: Uppercase
// identifier: com.pilotmoon.popclip.extension.uppercase
// description: Make the selected text ALL UPPERCASE.
// icon: "square filled AB"
// popclip version: 4151
// keywords: capitalize capitalise all caps

exports.action = (input) => {
  popclip.pasteText(input.text.toUpperCase());
};
