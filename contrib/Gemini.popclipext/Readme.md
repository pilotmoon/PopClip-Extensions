# Gemini

Open Gemini in Chrome and prepare a structured prompt from selected text.

## What it does

1. Prompts for your question after you select text.
2. Builds this prompt format:

```text
【原文】
<selected text>

【问题】
<your question>
```

3. Copies the full prompt to your clipboard.
4. Opens a new `https://gemini.google.com/app` tab in Chrome.
5. You paste with `Command+V` and press Enter.

## Why manual paste

Gemini web currently has inconsistent auto-submit behavior across accounts and browser automation settings. This extension uses a stable clipboard-first flow.

## Requirements

- Google Chrome installed
- Logged in to Gemini web

## Author

- GravityPoet

## Credits

- Gemini icon image from Google Gemini web assets (`gstatic.com`), trademark belongs to Google.

## Changelog

- 2026-02-18 First release
