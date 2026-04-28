// #popclip
// name: LLMTranslate
// icon: llmtranslate.png
// identifier: com.popclip.extension.llm-translate
// description: Translate selected text using OpenAI-compatible LLM APIs.
// popclipVersion: 4586
// entitlements: [network]

import axios from 'axios'
import { translation } from './langs.json'

// Helper function to get language name
function getLanguageName(code: string): string {
  const langData = translation[code as keyof typeof translation]
  return langData ? langData.name : code
}

// Helper function to build language list
function languageList(): { names: string[], codes: string[] } {
  const result = { codes: [] as string[], names: [] as string[] }
  const entries = Object.entries(translation)
  entries.sort(([k1, v1], [k2, v2]) => {
    return v1.name.localeCompare(v2.name)
  })
  for (const [key, value] of entries) {
    if (value.name === value.nativeName) {
      result.names.push(`${value.name}`)
    } else {
      result.names.push(`${value.name} / ${value.nativeName}`)
    }
    result.codes.push(key)
  }
  return result
}

// Generate language options dynamically
const { names, codes } = languageList()

export const options = [
  {
    identifier: 'apikey',
    label: 'API Key',
    type: 'secret',
    description:
      'Your OpenAI-compatible API key',
  },
  {
    identifier: 'apiEndpoint',
    label: 'API Endpoint',
    type: 'string',
    defaultValue: 'https://api.openai.com/v1',
    description:
      'Full URL of the API endpoint. Leave as default for OpenAI.',
  },
  {
    identifier: 'apiModel',
    label: 'Model',
    type: 'string',
    defaultValue: 'gpt-4.1-mini',
    description:
      'The model to use for translation.',
  },
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
  },
] as const

type Options = InferOptions<typeof options>

// translate using OpenAI API
async function translate (Text: string, to: string, apikey: string, endpoint: string, model: string): Promise<string> {
  const openai = axios.create({
    baseURL: endpoint,
    headers: {
      'Authorization': `Bearer ${apikey}`,
      'Content-Type': 'application/json'
    }
  })

  try {
    const response = await openai.post('/chat/completions', {
      model: model,
      messages: [
        {
          role: 'system',
          content: 'You are a professional translator. Provide accurate, natural-sounding translations. Keep the translation concise and appropriate for the context. Only return the translated text without any additional explanation or formatting.'
        },
        {
          role: 'user',
          content: `Translate the following text to ${getLanguageName(to)}:\n\n"${Text}"`
        }
      ],
      max_completion_tokens: 1500
    })

    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content.trim()
    } else {
      throw new Error('No translation received from API')
    }
  } catch (error: any) {
    // Handle different types of errors
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error('Invalid API key - check your configuration')
      } else if (error.response.status === 429) {
        throw new Error('Rate limit exceeded - try again later')
      } else if (error.response.data && error.response.data.error) {
        throw new Error(`API Error: ${error.response.data.error.message || error.response.data.error}`)
      } else {
        throw new Error(`Translation failed (Status: ${error.response.status})`)
      }
    } else if (error.request) {
      throw new Error('Network error - check your connection')
    } else {
      throw new Error(`Translation failed: ${error.message}`)
    }
  }
}

// our action
const action: ActionFunction<Options> = async (input, options) => {
  try {
    const result = await translate(input.text, options.destlang, options.apikey, options.apiEndpoint, options.apiModel)
    // Paste the translation result
    popclip.showText(result)
  } catch (error) {
    // Show error to user
    popclip.showText('Error: ' + (error instanceof Error ? error.message : String(error)))
  }
}

export const actions: Action<Options>[] = [
  {
    title: 'Translate',
    code: action,
  },
]
