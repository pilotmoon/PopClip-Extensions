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

async function appTranslate (): Promise<void> {
  popclip.pressKey('command C')
  await sleep(100)
  popclip.pressKey('command C')
}

// our action
export const actions: ActionObject[] = [{
  requirements: ['text', 'option-mode=web'],
  code: (input, options) => webTranslate(input.text, options.destlang as string)
}, {
  requirements: ['text', 'option-mode=app'],
  app: { bundleIdentifiers: ['com.linguee.DeepLCopyTranslator'], checkInstalled: true, name: 'DeepL', link: 'https://www.deepl.com/app/' },
  code: appTranslate
}]

// the dynamically generated extension options
export const options: Option[] = (() => {
  const modeOption: Option = {
    identifier: 'mode',
    label: 'Mode',
    type: 'multiple',
    valueLabels: ['DeepL Website', 'DeepL App'],
    values: ['web', 'app'],
    description: "In 'DeepL App' mode, the app must be running, and have 'DeepL Shortcut' set to '⌘+C+C'."
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
  return [modeOption, languageOption]
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
