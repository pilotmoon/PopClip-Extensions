// #popclip
// name: Append to Clipboard
// identifier: com.pilotmoon.popclip.extension.append
// description: Append the selected text as a new line after the existing clipboard contents.
// popclipVersion: 4586
// icon: plus.png

export const action: ActionFunction = (input) => {
  const separator = popclip.modifiers.shift ? "" : "\n";
  if (popclip.modifiers.option) {
    pasteboard.text = input.text.trim() + separator + pasteboard.text.trim();
  } else {
    pasteboard.text = pasteboard.text.trim() + separator + input.text.trim();
  }
};
