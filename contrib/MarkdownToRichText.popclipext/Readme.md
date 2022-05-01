# Markdown to Rich Text

It interprets the plain text of the selection as Markdown, and converts it to Rich Text Format (RTF) and pastes it over the selection. If pasting is not possible, it copies it to the clipboard instead.

By contrast with the Markdown to HTML extension, which produces HTML *source code* as plain text, this extension produces RTF content which is labelled as RTF on the clipboard. This means it is recognised by any Mac app which supports pasting RTF content.

By holding the Shift key you force it to copy to the clipboard instead of pasting.

### A note on formatting

As part of the conversion process, decision had to baked in regarding font styles, indentation, spacing etc. The conversion tries use simple, sane choices for formatting. It also tries to match the existing font of the selection is possible, with fallback to the system default font.

Please send feedback to Nick if you have comments about the output formatting choices or notice any glitches.

### Options

The **Paragraph Separation** option determines how paragraphs are separated in the output, as follows:

* **0.5x Spacing** (default) sets the paragraph spacing to half the line height;
* **Blank Line** adds a full blank line between paragraphs instead.

### Limitations

Not all markdown features are currently supported:

* `----` to produce a horizontal separator will not work
* HTML tags mixed into the Markdown will not be processed

### TODO

* Icon!
* Testing/gather feedback.

## About

This is an extension for [PopClip](https://pilotmoon.com/popclip/).

### Author

Nick Moore

### Requirements

* Requires PopClip Build 3835
* Requires macOS 12.0

## Changelog

### v0 - 13 Apr 2022

* Initial test release.
