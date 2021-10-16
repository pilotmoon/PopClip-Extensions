# Changelog

All notable changes to PopClip's extensions programming interface will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Version numbers correspond to [PopClip](https://pilotmoon.com/popclip) releases. (Version numbers are
[calendar based](https://calver.org).)

## [Unreleased (beta)](https://pilotmoon.com/popclip/download)

### Added

- An extension with a single action can specify its action entirely at the top level of the Config.plist, without using an `Actions` array.
- Extensions can use a JSON confg file, `Config.json`, instead of `Config.plist`. All the same field names can be used as for the plist. (There is also an alternative set of field names, which are more "JavaScript-like", which I still need to doument.) Shell command: `plutil -convert json -r -o Config.json Config.plist` will convert automatically from plist to JSON.)
- The `Extention Identifier` can be omitted. If so, popclip will internally generate an identifier from the package name.

### Notes

My hope is that that the above changes, plus the other changes already introduced in v2021.9 and v2021.10, mean that the barrier to entry for users creating their own extensions is much lower. For example, the following `Config.json` file now fully specifies a Search extension, including an icon:

```json
{
    "Extension Name": "Example",
    "Extension Icon": "(Ex)",
    "URL": "http://example.com/blah/{popclip text}"
}
```

...which could be typed out in TextEdit and wrapped into an extension using Finder.

## 2021.10 (3543) — 30 Sep 2021

### Added

- Executable shell scripts now have the user's `PATH` set in the script variables.
- Brought back `Preserve Image Color`.

### Changed

- The action title may now be omitted. If so, the action takes the extension name as its title.
- Similarly, the action icon now defaults to the extension icon, if there is one.

### Deprecated

- The `Script Interpreter` field is deprecated; instead, specify the interpreter with a hashbang at the top of the script. A hashbang using `env`, for example `#!/usr/bin/env perl`, is recommend. This will find the scripting runtime executable in the user's `PATH`. Note that when using a hashbang, the script must also have its executable mode bit set (e.g. with `chmod +`).

## 2021.9 (3510) — 22 Sep 2021

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
