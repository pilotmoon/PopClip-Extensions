# Markdown to RTF

It interprets the plain text of the selection as Markdown, and converts it to Rich Text Format (RTF) and copies it to the clipboard. (By holding ⌥⇧ you can get it to try to paste the result in place instead.)

By contrast with the Markdown to HTML extension, which produces HTML *source code* as plain text, this extension produces RTF content which is labelled as RTF on the clipboard. This means it is recognised by any Mac app which supports pasting RTF content.

### A note on formatting

As part of the conversion process, decision had to baked in regarding font styles, indentation, spacing etc. The conversion tries to use use simple, sane choices for formatting.

Please send feedback to Nick if you have comments about the output formatting choices or notice any glitches.

### Limitations

Not all markdown features are currently supported:

* `----` to produce a horizontal separator will not work
* HTML tags mixed into the Markdown will not be processed

### To-do

Add a sub-action to set the output font by selecting some text in that font.

## About

This is an extension for [PopClip](https://pilotmoon.com/popclip/).

### Author

Nick Moore

### Requirements

* Requires PopClip Build 4031
* Requires macOS 12.0

## Changelog

### 29 Nov 2022

* Simplify and streamline the extension; change minimum requirement to next beta.

### 17 Sep 2022

* Change default behaviour to Copy.

### 13 Apr 2022

* Initial test release.
