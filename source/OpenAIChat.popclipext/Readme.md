# OpenAI Chat

PopClip extension to send the selected text to [OpenAI](https://openai.com/)'s GPT-3.5, GPT-4, GPT-4-Turbo or GPT-4o [Chat API](https://platform.openai.com/docs/api-reference/chat).

The response is pasted after the selected text. The previous messages in the chat are sent along with each new message, allowing an extended dialogue with the AI.

**Note: Requires pre-paid API credits on your OpenAI account. API usage is not included in ChatGPT Plus subscripiton.**

See also: [ChatGPT Website](https://www.popclip.app/extensions/x/73pbck) extension, which opens a new chat on the ChatGPT website.

### Actions

The main action, **Chat**, sends the selected text to OpenAI and
either pastes the response after the selected text, replaces the selected text
with the response, or copies the response to the clipboard.

Modifiers:

- Hold Shift(⇧) to copy the response to the clipboard.

- Hold Option(⌥) to do the opposite of the current Response Handling setting.

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

Available values are `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`, `gpt-4o` and `gpt-4o-mini`. Note that some accounts might not be able to access all models — see OpenAI's documentation for details.

#### System Message

Optional text to specify the system message. This tells the assistant how to behave.

Example system message:

- _You are proofreader. I want you to correct the spelling and grammar of my messages. Please reply to each message with a corrected version. After each message, please briefly list the errors you corrected._

If you leave the System Message field blank, no system message will be specified.

#### API Base Domain

The base domain for the OpenAI API. This should be `api.openai.com` unless you
are using a custom domain to access the API.

#### Reset Timer (minutes)

After this many minutes without any messages, the extension will automatically
reset the conversation. Set it blank to never reset, and set it to 0 to always
reset. The default value is 15 minutes.

#### Show Reset Button

Control whether or not to show the reset action in the popup.

#### Response Handling

Control how the response is handled. The options are:

- **Append** (default): Append the response to the end of the selected text.
- **Replace**: Replace the selected text with the response.

### Errors

You may see the following error:

`Message from OpenAI (code 429): You exceeded your current quota, please check your plan and billing data.`

The message means you need to add some credit to you OpenAI API account. You can do this at <https://platform.openai.com/account/billing/overview>.

## Notes

Author: Nick Moore, with additional contributions.

Icons:

- "openai" by [Simple Icons](https://simpleicons.org/).
- "broom" by [GameIcons](https://game-icons.net/).

## Changelog

- 2024-11-12: Add "Response Handling" setting. Thanks to [@zhiyelee](https://github.com/pilotmoon/PopClip-Extensions/pull/1250) for the idea.
- 2024-07-30: Add `gpt-4o-mini` model. Thanks to [@kis87988](https://github.com/pilotmoon/PopClip-Extensions/pull/1249).
- 2024-05-18: Add API Base Domain setting. Thanks to [@chentao1006](https://github.com/chentao1006).
- 2024-05-17: Store API key in keychain. Configurable system message. PopClip bar stays on screen after pressing reset. Rename to "OpenAI Chat".
- 2024-05-15: Update model list to include `gpt-4o`. Thanks to [@igor-arkhipov](https://github.com/igor-arkhipov).
- 2024-03-14: Add support for `gpt-4-turbo-preview` model. Fix thanks to [@santiagoti](https://github.com/santiagoti).
- 2023-09-24: Add support for GPT-4 model. Fix thanks to [@rijieli](https://github.com/pilotmoon/PopClip-Extensions/pull/1225).
- 2023-08-31: Add documentation about error message to README.
- 2023-07-15: Add error message reporting instead of just an X.
- 2023-03-03: Initial release.
