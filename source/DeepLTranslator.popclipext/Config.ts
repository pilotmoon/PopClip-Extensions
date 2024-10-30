// #popclip
// identifier: com.pilotmoon.popclip.extension.deepl-translator
// popclipVersion: 4586
// name: DeepL Translator
// icon: deepl.png
// app:
//   link: 'https://www.deepl.com/macos-app'
//   name: DeepL
// description: Translate with DeepL app.

async function appTranslate() {
  popclip.pressKey("command C");
  await sleep(100);
  popclip.pressKey("command C");
}

// our action
export const actions: Action[] = [
  {
    app: {
      bundleIdentifiers: ["com.linguee.DeepLCopyTranslator"],
      checkInstalled: true,
      name: "DeepL",
      link: "https://www.deepl.com/macos-app",
    },
    code: appTranslate,
  },
];
