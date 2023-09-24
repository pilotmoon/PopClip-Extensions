# ChatGPT

PopClip extension to send the selected text to [OpenAI](https://openai.com/)'s GPT-3.5 chat API, and append the response.

**Note: Requires pre-paid API credits on your OpenAI account. API usage is not included in ChatGPT Plus subscripiton.**

## Description

### Actions

The main action, **Chat**, sends the selected text to OpenAI and
appends the response as a new line.

The previous messages in the chat are sent along with each new message, allowing an extended dialogue with the AI.

Modifiers:

- Hold Shift(⇧) to copy just the response to the clipboard.

- Hold Option(⌥)-Shift(⇧) to paste the response over the selection.

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

Available values are `gpt-3.5-turbo` and `gpt-4`. Note that some accounts might not be able to access the GPT-4 model — see OpenAI's documentation for details.

#### Reset Timer (minutes)

After this many minutes without any messages, the extension will automatically
reset the conversation. Set it blank to never reset, and set it to 0 to always
reset. The default value is 15 minutes.

#### Show Reset Button

Control whether or not to show the reset action in the popup.

### Errors

You may see the following error:

`Message from OpenAI (code 429): You exceeded your current quota, please check your plan and billing data.`

The message means you need to add some credit to you OpenAI API account. You can do this at <https://platform.openai.com/account/billing/overview>.

## About

### Author

Nick Moore

### Acknowledgements

Icons:

- "openai" by [Simple Icons](https://simpleicons.org/).
- "broom" by [GameIcons](https://game-icons.net/).

### Requirements

Requires PopClip 2022.12 and an Open AI Platform account.

## Changelog

### 2023-09-24

- Add support for GPT-4 model. Fix thanks to [@rijieli](https://github.com/pilotmoon/PopClip-Extensions/pull/1225).

### 2023-08-31

- Add documentation about error message to README.

### 2023-07-15

- Add error message reporting instead of just an X.

### 2023-03-03.1

- Add configurable reset timer.

### 2023-03-03

- Initial release.
