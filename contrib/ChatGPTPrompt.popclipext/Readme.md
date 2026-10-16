# ChatGPT Prompt

A PopClip extension that adds a follow-up question dialog before sending selected text directly to ChatGPT.

## How to use

1. Select text in any app.
2. Click the ChatGPT icon in PopClip.
3. Enter your follow-up question in the popup dialog.
4. ChatGPT opens with a prefilled prompt and sends via `q` URL flow.

## Prompt format

```text
【原文】
<selected text>

【问题】
<your question>
```

## Advantages vs ChatGPT Website extension (73pbck)

Compared with [ChatGPT Website](https://www.popclip.app/extensions/x/73pbck):

1. Adds an inline question dialog so you can add intent before sending.
2. Keeps direct-send behavior by using the same `https://chatgpt.com/?q=` path.
3. Uses a structured prompt format to improve context quality for long/complex selections.

## Requirements

- ChatGPT web access (`https://chatgpt.com/`)

## Author

- GravityPoet

## Changelog

- 2026-02-18 Initial release
