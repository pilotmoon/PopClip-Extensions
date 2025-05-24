// #popclip
// name: Append to Clipboard
// identifier: com.pilotmoon.popclip.extension.append
// description: Combine the selected text with the existing clipboard contents.
// popclipVersion: 4586
// icon: plus.png

export const action: ActionFunction = (input) => {
  const separator = popclip.modifiers.option ? " " : "\n";
  if (popclip.modifiers.shift) {
    pasteboard.text = input.text.trim() + separator + pasteboard.text.trim();
  } else {
    pasteboard.text = pasteboard.text.trim() + separator + input.text.trim();
  }
};
