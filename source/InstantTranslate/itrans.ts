import axios from 'axios' // TODO @popclip/axios
import { translation } from './langs.json'
import { access } from './access.json'

// the translation endpoint
const { key } = util.clarify(access)
const endpoint = axios.create({
  baseURL: 'https://api.cognitive.microsofttranslator.com',
  headers: { 'Ocp-Apim-Subscription-Key': key },
  params: { 'api-version': '3.0' }
})

// translate using MS Translation api
async function translate (Text: string, to: string): Promise<string> {
  const response = await endpoint.post('translate', [{ Text }], { params: { to } })
  return (response.data as any[])[0].translations[0].text
}

// our action
export const action: ActionFunction = async (input, options) => {
  return await translate(input.text, options.destlang as string)
}

// the extension options; construct the options values from the json file
export const options: Option[] = (() => {
  const codes: string[] = []
  const names: string[] = []
  const entries = Object.entries(translation)
  entries.sort(([k1, v1], [k2, v2]) => {
    return v1.name.localeCompare(v2.name)
  })
  for (const [key, value] of entries) {
    if (value.name === value.nativeName) {
      names.push(`${value.name}`)
    } else {
      names.push(`${value.name} / ${value.nativeName}`)
    }
    codes.push(key)
  }
  return [
    {
      identifier: 'destlang',
      label: {
        en: 'Destination Language',
        'zh-Hans': '翻译为',
        'zh-Hant': '轉換為'
      },
      type: 'multiple',
      valueLabels: names,
      values: codes,
      defaultValue: 'en'
    }
  ]
})()
