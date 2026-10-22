// #popclip
// identifier: com.pilotmoon.popclip.extension.deepl-translator
// popclipVersion: 4586
// name: DeepL Translator
// icon: deepl.png
// app:
//   link: 'https://www.deepl.com/macos-app'
//   name: DeepL
// description: Translate with DeepL app.

export const options = [
  {
    identifier: "combo",
    label: "DeepL Keyboard Shortcut",
    type: "string",
    description:
      "Leave this blank to use '⌘+C+C', the default. Or type a shortcut like 'control option command D', if you have set custom DeepL preferences.",
  },
] as const;

type Options = InferOptions<typeof options>;

const appTranslate: ActionFunction<Options> = async (_, options) => {
  if (options.combo.length === 0) {
    popclip.pressKey("command C");
    await sleep(100);
    popclip.pressKey("command C");
  } else {
    popclip.pressKey(options.combo);
  }
};

// our action
export const actions: Action<Options>[] = [
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
