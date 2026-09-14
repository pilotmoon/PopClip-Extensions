# Claude Website

This PopClip extension opens a new chat on the Claude website with your selected
text as the first message.

## Options

#### Prompt

Optional prompt to insert at the start of the message. If you leave the Prompt
field blank, the selected text will be sent as-is, without a prompt.

## Info

- Author: Nick Moore

### Notes

The basic URL format is: `https://claude.ai/new?q={text}`

## Changelog

- 14 Sep 2026: Pass URL string to openUrl explicitly (works around a PopClip 2026.8.1 bug with URL objects).
- 16 April 2026: Initial release
