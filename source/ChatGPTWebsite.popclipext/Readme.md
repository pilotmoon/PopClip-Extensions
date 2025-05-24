# ChatGPT Website

This PopClip extension opens a new chat on the ChatGPT website with your
selected text as the first message.

See also: [ChatGPT API](https://www.popclip.app/extensions/x/48f32j) extension,
which sends the text directly the API.

## Options

#### Model

OpenAI model to select via URL parameter. Options are "Default" (currently
GPT-3.5), "GPT 4" and "GPT 4o".

#### Prompt

Optional prompt to insert at the start of the message.

Example prompts might be:

- _Translate the following text into French._
- _Summarize the following text in 20 words or less._
- _Act as a proofreader. Correct the spelling and grammar of the following
  text._

If you leave the Prompt field blank, the selected text will be sent as-is,
without a prompt.

## Info

- Author: Nick Moore
- Icon: based on "openai" from Simple Icons (CC0)

### Notes

The basic URL format is: `https://chatgpt.com/?q={text}&model={model}`

## Changelog

- 12 Mar 2025: Add maximum of 8000 characters input since the web link breaks
  with long inputs.
- 28 May 2024: Remove the quoting when using a prompt.
- 19 May 2024: Removed custom GPT option since it didn't work!
- 17 May 2024: Added option to specify a prompt.
- 15 May 2024 (2): Added option to specify custom GPT.
- 15 May 2024: Initial release.
