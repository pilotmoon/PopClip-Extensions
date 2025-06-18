# OpenAI Chat

A PopClip extension to interact with [OpenAI](https://openai.com/)'s
[Chat API](https://platform.openai.com/docs/api-reference/chat).

**Note: Requires pre-paid API credits on your OpenAI account. API usage is not
included in ChatGPT Plus subscripiton.**

See also: [ChatGPT Website](https://www.popclip.app/extensions/x/73pbck)
extension, which opens a new chat on the ChatGPT website.

### Actions

The main action, **Chat**, sends the selected text to OpenAI and either pastes
the response after the selected text, replaces the selected text with the
response, or copies the response to the clipboard.

The **Reset** action (broom icon) clears the current chat history to start a
fresh conversation.

### Configuration

#### API Key

To use this extension, you need to provide it with an API Key for an OpenAI
account. To get an API Key:

1. Sign up for an OpenAI Account here: <https://platform.openai.com/>
2. Generate an API key here: <https://platform.openai.com/account/api-keys>
3. Copy and paste the API Key (it starts with `sk-`) into the _API Key_ field in
   the extension's settings.

#### Model

Available values are `gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano`, `o3`, `o3-mini` and `o4-mini`. Note that some accounts might not be able to access all models — see OpenAI's documentation for details.

#### System Message

Optional text to specify the system message. This tells the assistant how to
behave.

Example system message:

> You are proofreader. I want you to correct the spelling and grammar of my
> messages. Please reply to each message with a corrected version. After each
> message, please briefly list the errors you corrected.

If you leave the System Message field blank, no system message will be
specified.

#### API Base Domain

The base domain for the OpenAI API. This should be `api.openai.com` unless you
are using a custom domain to access the API.

#### Response Handling

Control how the response is handled. The options are:

- **Append** (default): Append the response to the end of the selected text.
- **Replace**: Replace the selected text with the response.
- **Copy**: Copy the response to the clipboard.

Modifiers:

- Shift(⇧) to copy the response to the clipboard.
- Option(⌥) in append mode, replace instead. In replace mode, append instead.

#### Reset Timer (minutes)

After this many minutes without any messages, the extension will automatically
reset the conversation. Set it blank to never reset, and set it to 0 to always
reset. The default value is 15 minutes.

#### Show Reset Button

Control whether or not to show the reset action in the popup.

### Errors

You may see the following error:

`Message from OpenAI (code 429): You exceeded your current quota, please check your plan and billing data.`

The message means you need to add some credit to you OpenAI API account. You can
do this at <https://platform.openai.com/account/billing/overview>.

## Notes

Author: Nick Moore, with additional contributions.

Icons:

- "openai" by [Simple Icons](https://simpleicons.org/).
- "broom" by [GameIcons](https://game-icons.net/).

## Changelog

- 2025-06-18: Add "Custom model" setting. Add `gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano`, `o3`, `o4-mini`. Set default to `gpt-4.1-nano`. Remove `o1`, `o3-mini` `gpt-4o-mini` models from list.
- 2025-02-04: Add `o1` and `o3-mini` models. Set default to `gpt-4o-mini`. Remove `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo` and `o1-preview` models from list.
- 2024-11-20: Add `o1-preview` and `o1-mini` models.
- 2024-11-15: Add "Copy" tp Response Handcling options.
- 2024-11-12: Add "Response Handling" setting. Thanks to
  [@zhiyelee](https://github.com/pilotmoon/PopClip-Extensions/pull/1250) for the
  idea.
- 2024-07-30: Add `gpt-4o-mini` model. Thanks to
  [@kis87988](https://github.com/pilotmoon/PopClip-Extensions/pull/1249).
- 2024-05-18: Add API Base Domain setting. Thanks to
  [@chentao1006](https://github.com/chentao1006).
- 2024-05-17: Store API key in keychain. Configurable system message. PopClip
  bar stays on screen after pressing reset. Rename to "OpenAI Chat".
- 2024-05-15: Update model list to include `gpt-4o`. Thanks to
  [@igor-arkhipov](https://github.com/igor-arkhipov).
- 2024-03-14: Add support for `gpt-4-turbo-preview` model. Fix thanks to
  [@santiagoti](https://github.com/santiagoti).
- 2023-09-24: Add support for GPT-4 model. Fix thanks to
  [@rijieli](https://github.com/pilotmoon/PopClip-Extensions/pull/1225).
- 2023-08-31: Add documentation about error message to README.
- 2023-07-15: Add error message reporting instead of just an X.
- 2023-03-03: Initial release.
