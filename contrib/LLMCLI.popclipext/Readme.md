# LLM CLI

Author: Abdullah Peşteli

Rewrite selected text using a logged-in command-line LLM client.

This extension is for users who already use one of the supported CLI tools and
want PopClip to send the selected text to that CLI without entering a separate
API key in PopClip.

Supported providers:

- Codex CLI
- Claude CLI
- Gemini CLI
- OpenCode CLI

The provider must already be installed, available on `PATH`, and logged in.

## Usage

1. Select text.
2. Click the LLM CLI action.
3. The selected text is replaced with the rewritten text.

The extension settings let you choose:

- Provider
- Preset
- Optional model name
- Custom prompt, when the Custom preset is selected

## Presets

- Düzelt: minimal Turkish spelling and punctuation correction.
- Chat Kurumsal: clearer WhatsApp/Telegram work-message tone.
- Mail Kurumsal: professional client-facing email tone.
- Müşteri Tonu: warmer corporate client communication.
- Custom: use your own instruction from the extension settings.

## Notes

This extension invokes third-party CLI tools. Selected text is sent to whichever
provider/model you configure in that CLI. Review your provider's privacy and
data-use settings before using the extension with sensitive text.

The extension uses a shell script because PopClip's JavaScript environment
cannot run external CLI commands directly.

## Changelog

- 2026-07-02: Initial version.
