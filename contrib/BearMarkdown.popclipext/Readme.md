# Bear Markdown

Create a new note in Bear from the selected text, preserving supported formatting as Markdown.

When the selected text comes from a browser where PopClip can read page info, the extension adds the page title and URL as a source link at the bottom of the note.

The extension asks PopClip to capture HTML when available. If the captured HTML includes tables, Bear Markdown converts those tables to Markdown tables before opening Bear.

## Requirements

- Bear for macOS
- PopClip with JavaScript extension support

## Notes

Bear does not display remote Markdown images inline in all contexts. Remote image references are preserved as Markdown links or image syntax where PopClip provides them, but the extension does not download or attach image files.

Complex HTML tables with `rowspan` or `colspan` are converted on a best-effort basis.

## Author

Created by pkops.

## Changelog

- 2026-05-03: Initial contribution.
