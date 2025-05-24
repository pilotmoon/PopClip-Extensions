# Markdown to RTF

Convert Markdown source to formatted text, and place it on the clipboard.

## Description

It interprets the plain text of the selection as Markdown, and converts it to Rich Text Format (RTF) and copies it to the clipboard.

By contrast with the [Markdown](https://pilotmoon.com/popclip/extensions/Markdown) extension, which produces HTML *source code* as plain text, this extension produces RTF content that is labelled as RTF on the clipboard. This means it is recognised by any Mac app which supports pasting RTF content.

### A note on formatting

As part of the conversion process, decision had to baked in regarding font styles, indentation, spacing etc. The conversion tries to use use simple, sane choices for formatting.

Please send feedback to Nick if you have comments about the output formatting choices or notice any glitches.

### Limitations

Not all markdown features are currently supported:

* `----` to produce a horizontal separator will not work
* HTML tags mixed into the Markdown will not be processed

### To-do, notes

* Add a sub-action to set the output font by selecting some text in that font?
* Icon is pretty poor. I'm open to better ideas!

## About

This is an extension for [PopClip](https://www.popclip.app/).

### Author

Nick Moore

### Requirements

* Requires PopClip 2022.12.
* Requires macOS 12.0.

## Changelog

### 20 Jan 2023

* Proper release now that 2022.12 is available.

### 29 Nov 2022

* Simplify and streamline the extension; change minimum requirement to next beta.

### 17 Sep 2022

* Change default behaviour to Copy.

### 13 Apr 2022

* Initial test release.
