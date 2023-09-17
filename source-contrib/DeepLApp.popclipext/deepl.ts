async function appTranslate (combo: string): Promise<void> {
  if (combo.length === 0) {
    popclip.pressKey('command C')
    await sleep(100)
    popclip.pressKey('command C')
  } else {
    popclip.pressKey(combo)
  }
}

// our action
export const action: Action = {
  app: { bundleIdentifiers: ['com.linguee.DeepLCopyTranslator'], checkInstalled: true, name: 'DeepL', link: 'https://www.deepl.com/app/' },
  code: async (_, options) => {
    await appTranslate(options.combo as string)
  }
}

// the dynamically generated extension options
export const options: Option[] = (() => {
  const comboOption: Option = {
    identifier: 'combo',
    label: 'DeepL Shortcut',
    type: 'string',
    description: "Leave this blank to use '⌘+C+C', the default. Or type a shortcut like 'control option command D', if you have set custom DeepL preferences."
  }
  return [comboOption]
})()
