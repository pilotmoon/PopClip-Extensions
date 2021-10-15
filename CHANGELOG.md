# Changelog

All notable changes to the PopClip extensions programming interface will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Version numbers correspond to [PopClip](https://pilotmoon.com/popclip) releases. (Version numbers are
[calendar based](https://calver.org).)

## 2021.10 

### Added

- Executable shell scripts now have the user's `PATH` set in the script variables, so they can now use hashbang with `env` such as `#!/usr/bin/env perl` to avoid having to hard code the path.
- Brought back `Preserve Image Color`.

## 2021.9

### Added

- PopClip now supports SVG image files as well as allowing you to specifiy an image as a SF Symbols identifier or to generate an icon from up to 3 letters of text.
- PopClip now provides an HTML and a Markdown version for _all_ text selections, when `Pass HTML` is set. When the content is not HTML backed, the HTML and Markdown is generated from the selected RTF or plain text content.
- Added `POPCLIP_MARKDOWN` field to contain the markdownified HTML.
- Added `POPCLIP_ACTION_IDENTIFIER` field. This is passed to the action script allowing you to use the same script for multiple actions.
- Added `POPCLIP_FULL_TEXT` field. This is always contains the full selected text in cases where `POPCLIP_TEXT` only contains the part of text matched by regex or requirement.
- Added `Option Value Labels` array so that the options list can show a display name different to option string value itself.
- Added `Option Description` field to add more information in the UI about an option.
- Shell scripts with the executable bit set can optionally specify their interpreter with a hashbang, instead of the `Script Interpreter` field.

### Removed

- Removed the `html` requirement since all selections now come with HTML (as above).
- ~~Removed the `Preserve Image Color` option. PopClip now always converts the icon to monochrome.~~ _Restored in 2021.10._
- Removed the `Restore Pasteboard` option. PopClip now always restores the pasteboard, unless using the `*-result` keys.
- Removed the `Long Running` option. All extensions are now assumed to be potentially long running.

### Changed

- The `POPCLIP_HTML` field is now sanitized to remove CSS, potentially unsafe tags, and to fix invalid markup. The unsanitized HTML is still available in a new field `POPCLIP_RAW_HTML`.
- Renamed the `Image File` and `Extension Image File` fields to `Icon` and `Extension Icon`, respectively. (The old names will also still work but are no longer documented.)
- Added `App` dictionary field to specify a single app (since it turns out we hardly ever need to specify more than one app). (`Apps` array will still work but is no longer documented.)
- The error checking when loading an extension is more robust, so errors such as incorrect field types will now be caught. And you'll get an more specific message about what the problem is.

One more thing... there is also a brand new extension format based on JavaScript. Documentation still "to-do", watch this space!
