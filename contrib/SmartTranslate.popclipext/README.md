# Smart Translate

PopClip extension to send the selected text to [OpenAI](https://openai.com/)'s GPT-3.5, GPT-4, GPT-4-Turbo or GPT-4o [Chat API](https://platform.openai.com/docs/api-reference/chat), for improving or translating it to the standard target language.

The response is pasted after the selected text. If you click the extension action button with the "Shift" key pressed, the response will be copied to the clipboard.

**Note: Requires pre-paid API credits on your OpenAI account. API usage is not included in ChatGPT Plus subscripiton.**

### Actions

The main action, **Smart Translate**, sends the selected text to OpenAI for improvement or translation to the standard target language, and then appends the response as a new line or copies it to the clipboard.

Modifiers:

- Hold Shift(⇧) to copy just the response to the clipboard.

### Configuration

#### API Key

To use this extension, you need to provide it with an API Key for an OpenAI
account. To get an API Key:

1. Sign up for an OpenAI Account here: <https://platform.openai.com/>
2. Generate an API key here: <https://platform.openai.com/account/api-keys>
3. Copy and paste the API Key (it starts with `sk-`) into the _API Key_ field in
   the extension's settings.

#### Model

Available values are `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo` and `gpt-4o`. Note that some accounts might not be able to access all models — see OpenAI's documentation for details.

#### Target Language

Select the target language for translating the text or the language of the input text that needs optimization.

### Errors

You may see the following error:

`Message from OpenAI (code 429): You exceeded your current quota, please check your plan and billing data.`

The message means you need to add some credit to you OpenAI API account. You can do this at <https://platform.openai.com/account/billing/overview>.

## Notes

Author: Shawn Lee, inspired by [OpenAIChat.popclipext](https://github.com/pilotmoon/PopClip-Extensions/tree/b8213717958ae1e71b755f156c313cbaca034979/source/OpenAIChat.popclipext).
