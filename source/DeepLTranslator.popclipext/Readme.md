# DeepL Translator

Translate text with the
[DeepL Translator desktop app](https://www.deepl.com/macos-app).

The extension has a single action that takes text as input and sends it to the
DeepL app.

The DeepL app must already be running.

## Configuration

- **DeepL Keyboard Shortcut**: Specify the keyboard shortcut for PopClip to
  press to invoke DeepL. If you leave this blank, PopClip will press "⌘+C+C",
  which is DeepL's default. Otherwise, enter a string like "control shift
  command D" (see
  [String format](https://www.popclip.app/dev/key-press-actions#string-format)).

## About

- Author: Nick Moore

## Changelog

- 16 Nov 2025: Reinstate option for custom shortcut.
- 20 Oct 2024: Remove support for DeepL website mode since it doesn't work
  anymore.
- 1 Jun 2023: Add Korean and Norwegian languages.
- 5 Oct 2022: Add support for Indonesian, Turkish and Ukrainian languages.
- 4 May 2022: Support DeepL app mode. Add more output languages to website mode.
  Set source language to auto detect in website mode. Fix bug in website mode
  where input text would be cut off after the first slash (/) character.
- 9 Nov 2020: Add more output languages.
- 27 Sep 2018: Initial release.
