# OpenAI Prompt

Apply custom instructions to selected text using OpenAI. Rewrite a paragraph,
translate a sentence, summarize a passage, or ask a question. Each selection
is sent independently, with no conversation history.

Requires PopClip 2026.8.1 or later and an OpenAI API key with available API
credits. API usage is billed separately from a ChatGPT subscription.

OpenAI Prompt is a new extension intended to replace the older
[OpenAI Chat](https://www.popclip.app/extensions/x/48f32j) extension. Install
and configure it separately; it does not automatically replace your existing
installation or import its settings. OpenAI Chat remains available if you
want to continue a conversation across selections.

## Actions

**Prompt** sends your instructions and the selected text to the API, then
replaces the selection with the response by default. Choose Copy in the settings
to copy the response instead.

Right-click (or Control-click) **Prompt** and choose **Copy Last Response** to
copy the latest successful answer without sending another request. That answer
is kept only in memory and is never included in subsequent requests.

## Configuration

### API Key

Create a key in your [OpenAI account](https://platform.openai.com/api-keys) and
paste it into the API Key field. PopClip stores the key in Keychain.

### Model

Suggested models are `gpt-5.6-luna` (default), `gpt-5.6-terra`, `gpt-5.6-sol`,
and `gpt-6-astra`. Choose **Other…** to enter another model name. The model
must support the Chat Completions API.

See OpenAI's [model information](https://developers.openai.com/api/docs/models)
and [pricing](https://developers.openai.com/api/docs/pricing).

### Thinking Effort

Choose **Model default**, **None**, **Low**, **Medium**, **High**, **Extra high**,
or **Maximum**. Higher effort can take longer and cost more. Supported levels
depend on the model and provider; GPT-6 Astra requires Low or higher.

**Model default** sends no effort parameter. Use it for models or providers
that do not support this setting.

### Response Detail

Choose **Model default**, **Concise**, **Normal**, or **Detailed**. This controls
how much explanation appears in the answer; it is not a hard length limit.

**Model default** sends no verbosity parameter. Use it for models or providers
that do not support this setting.

### Instructions

Optional multiline instructions included with every selection. For example:

> Correct the spelling and grammar of the selected text. Return only the
> corrected text, without commentary.

Or:

> Translate the selected text into French. Return only the translation.

Leave this field blank to send the selection on its own.

### API Base Domain

The default is `api.openai.com/v1`. To use another provider, enter its
OpenAI-compatible API base domain and path, without `https://`, and use that
provider's API key and model name.

### Response Handling

- **Replace** (default): Replace the selected text with the response.
- **Copy**: Copy the response to the clipboard.

Hold Shift (⇧) to copy the response for that request.

## Errors

Failed, refused, empty, and incomplete responses are reported without pasting
text. The last successful response remains available to copy. If the API
reports an unsupported parameter, try Model default for Thinking Effort and
Response Detail. A quota error usually means your API account needs credits.

## Credits

Based on OpenAI Chat by Nick Moore, with additional contributions.
OpenAI icon by [Simple Icons](https://simpleicons.org/).

## Changelog

- 2026-09-08: Initial release. Independent prompts with custom instructions,
  model selection, thinking effort, response detail, and Copy Last Response.
