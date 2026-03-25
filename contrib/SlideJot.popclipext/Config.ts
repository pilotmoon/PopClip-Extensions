// #popclip
// name: SlideJot
// identifier: com.pilotmoon.popclip.extension.slidejot
// description: Send selected text to SlideJot as a new Jot. Option (⌥) to append, Shift (⇧) to prepend.
// icon: icon.png
// popclipVersion: 4225
// app: { name: SlideJot, link: https://slidejot.com, checkInstalled: true, bundleIdentifiers: [com.dreamyfrog.SlideJot] }

export const action: ActionFunction = (input) => {
  const text = encodeURIComponent(input.text);
  if (popclip.modifiers.shift) {
    popclip.openUrl(`slidejot://prepend?text=${text}`, { activate: false });
  } else if (popclip.modifiers.option) {
    popclip.openUrl(`slidejot://append?text=${text}`, { activate: false });
  } else {
    popclip.openUrl(`slidejot://new?text=${text}`, { activate: false });
  }
};
