// languages list comes from https://api-free.deepl.com/v2/languages
import { langs } from './langs.json'
// sort the languages by name
langs.sort((a, b) => {
  return a.name.localeCompare(b.name)
})

function webTranslate (text: string, lang: string): void {
  // escape backslash before encoding (DeepL website needs this or it truncates at the slash)
  const escapedText = text.replace(/\//g, '\\/')
  const url = `https://www.deepl.com/translator#auto/${lang}/${encodeURIComponent(escapedText)}`
  popclip.openUrl(url)
}

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
export const actions: ActionObject[] = [{
  requirements: ['text', 'option-mode=web'],
  code: (input, options) => {
    webTranslate(input.text, options.destlang as string)
    return null
  }
}, {
  requirements: ['text', 'option-mode=app'],
  app: { bundleIdentifiers: ['com.linguee.DeepLCopyTranslator'], checkInstalled: true, name: 'DeepL', link: 'https://www.deepl.com/app/' },
  code: async (_, options) => {
    await appTranslate(options.combo as string)
    return null
  }
}]

// the dynamically generated extension options
export const options: Option[] = (() => {
  const modeOption: Option = {
    identifier: 'mode',
    label: 'Mode',
    type: 'multiple',
    valueLabels: ['DeepL App', 'DeepL Website'],
    values: ['app', 'web'],
    description: "In 'DeepL App' mode, the app must be running, and have 'DeepL Shortcut' set to '⌘+C+C'."
  }
  const comboOption: Option = {
    identifier: 'combo',
    label: 'DeepL App Shortcut',
    type: 'string',
    hidden: true,
    description: "Leave this blank to use '⌘+C+C', the default. Or type a shortcut like 'control option command D', if you have set custom DeepL preferences."
  }
  const { names, codes } = languageList()
  const languageOption: Option = {
    identifier: 'destlang',
    label: 'Website Output Language',
    type: 'multiple',
    valueLabels: names,
    values: codes,
    defaultValue: 'EN-US',
    description: "Only affects 'DeepL Website' mode."
  }
  return [modeOption, comboOption, languageOption]
})()

// build the language list from the json file
function languageList (): { names: string[], codes: string[] } {
  const result = { codes: [] as string[], names: [] as string[] }
  for (const lang of langs) {
    result.names.push(lang.name)
    result.codes.push(lang.language)
  }
  return result
}
