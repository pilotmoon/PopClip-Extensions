# AI Translate

A PopClip extension to translate or improve selected text using any
OpenAI-compatible API (OpenAI, Groq, Gemini, Ollama, etc.).

### Actions

**Translate** — Detects the language of the selected text and translates it
bidirectionally between your two configured languages. If the text is in your
Primary Language, it translates to the Secondary Language, and vice versa.

**Improve** — Rewrites the selected text to improve grammar, clarity, and style
while keeping the same language.

Both actions replace the selected text by default. This can be changed to append
or copy via the Response Handling settings.

### Configuration

#### API Key

Paste your API key into the _API Key_ field. The key is stored securely in your
macOS Keychain.

- **OpenAI**: Obtain a key at <https://platform.openai.com/account/api-keys>
- **Groq**: Obtain a key at <https://console.groq.com/keys>
- **Other providers**: Check their documentation for API key instructions.

#### Model / Custom Model

Select a model from the dropdown, or enter a model name in _Custom Model_ to
override it. Leave _Custom Model_ blank to use the dropdown selection.

#### API Base Domain

The base domain for the API endpoint. Defaults to `api.openai.com/v1` for
OpenAI. Change this to use other OpenAI-compatible providers:

- **OpenAI**: `api.openai.com/v1` (default)
- **Groq**: `api.groq.com/openai/v1`
- **Google Gemini**: `generativelanguage.googleapis.com/v1beta/openai`

#### Primary / Secondary Language

The two languages to translate between. The extension auto-detects which
language the selected text is in and translates to the other one.

- **Primary Language**: Your main language (default: `English`)
- **Secondary Language**: The other language (default: `Spanish`)

#### Additional Instructions

Optional extra instructions appended to the system prompt. Use this to
customise translation or improvement behaviour. Examples:

- `Keep original formatting. Do not translate code, variable names, or URLs.`
- `Use natural phrasing, not literal translation.`
- `Be concise. Use a professional tone.`

### Notes

Author: hiiamtrong

## Changelog

- 2026-04-30: Initial release.
