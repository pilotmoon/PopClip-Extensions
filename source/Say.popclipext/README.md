# Say

PopClip extension to speak the text aloud using the Mac's built-in text-to-speech.

The extension simply invokes the `say` command-line tool, which is included with macOS.

The text is spoken using the default voice settings, which can be changed in System Settings → Accessibility → Spoken Content.

## Changelog

### 2023-08-29

- Update to "modern" extension structure with JSON config, for documentation example purposes.
- Use `stdin` instead of shell variable for input.
- Update Readme to describe the new location of the default voice settings.

### 2017-07-17

- Fix bug when input contained `*` character.

### 2012-01-08

- Initial release.
