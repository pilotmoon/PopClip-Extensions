# ChatGPT Website

This PopClip extension opens a new chat on the ChatGPT website with your selected text as the first message.

See also: [ChatGPT API](https://www.popclip.app/extensions/x/48f32j) extension, which sends the text directly the API.

## Options

#### Model

OpenAI model to select via URL parameter. Options are "Default" (currently GPT-3.5), "GPT 4" and "GPT 4o".

#### Custom GPT identifier

If you want to use a custom GPT, you can paste the identifier here. You will find it in the URL of the website. It starts with `g-`, for example, `g-HMNcP6w7d-data-analyst`.

#### Prompt

Optional text to include at the start of the first message of each new chat. The message will be formatted like this:

```
{your prompt here}

Text: """
{selected text here}
"""
```

(This quoting structure is recommended by OpenAI in their [prompt
engineering guide](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api).)

Example prompts might be:

- _Translate the following text into French._
- _Summarize the following text in 20 words or less._
- _Act as a proofreader. Correct the spelling and grammar of the following text._

If you leave the Prompt field blank, the selected text will be sent as-is, without a prompt.

## Info

- Author: Nick Moore
- Icon: based on "openai" from Simple Icons (CC0)

### Notes

The basic URL format is: `https://chatgpt.com/?q={text}&model={model}`

## Changelog

- 17 May 2024: Added option to specify a prompt.
- 15 May 2024 (2): Added option to specify custom GPT.
- 15 May 2024: Initial release.
