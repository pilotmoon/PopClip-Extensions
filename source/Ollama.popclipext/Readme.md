# Ollama

A PopClip extension to interact with [Ollama](https://ollama.com/) models.

### Actions

The main action, **Chat** (llama icon), sends the selected text to Ollama and
either pastes the response after the selected text, replaces the selected text
with the response, or copies the response to the clipboard.

The **Reset** action (broom icon) clears the current chat history to start a
fresh conversation.

## Prerequisites

Requires Ollama to be installed locally. Please see
[Ollama's Docs](https://docs.ollama.com/) for instructions.

## Configuration

### Model

Specify the model name, for example `gemma3`.

- You can install a model using command `ollama pull <modelname>`.
- Find models at: <https://ollama.com/search>

#### System Message

Optional message to tell the assistant how to behave.

#### API Root

The base URL for the Openllama API. The default is:
`http://127.0.0.1:11434/api`.

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

## Notes

Author: Nick Moore, with additional contributions.

Icons:

- "ollama" by [Simple Icons](https://simpleicons.org/).
- "broom" by [GameIcons](https://game-icons.net/).

## Changelog

- 2025-12-02: Initial release
