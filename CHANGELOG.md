<!-- markdownlint-configure-file
{
  "no-duplicate-header": false
}
-->

# Changelog

All notable changes to PopClip's extensions programming interface will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Version numbers correspond to [PopClip](https://pilotmoon.com/popclip) releases. (Version numbers are
[calendar based](https://calver.org).)

## Beta / Unreleased

### Changed

- Increased maximum snippet length from 1000 to 5000 characters.
- Optionally, the `#popclip` marker may now appear at the end of the snippet instead of the start. This means that a one-liner like `{name: Test, shortcut name: Test Shortcut} #popclip`, which is valid YAML, is now a valid PopClip snippet.

### Fixed

- The snippet detector now correctly recognises snippets written in JSON syntax. (Valid JSON is valid YAML.)

## PopClip 2022.5 (3895)

### Added

- Added the ability to execute pre-compiled AppleScript `.scpt` files, and to invoke handlers within them with parameters.
- Key Press extensions can now take an array of key combos, to press a sequence of keys.
- Extended the key code string format to simplify specifying non-character keys, and raw key codes. For example: `command tab`.
- Brought back the `restore pasteboard` field for actions.
- Added a 'test harness' mode to PopClip, for testing your JavaScript code in the PopClip environment. Run as: `/Application/PopClip.app/Contents/MacOS/PopClip runjs <filename>`
- Additions to the JavaScript programming environment:
  - Added RTF processing features (via RichText class object).
  - Added locale information to the `util` object.
  - Added a promise-based global function `sleep` (e.g. `await sleep(1000)`).
  - Supports the new key combo string format in the `popclip.pressKey()` method.
  - Improvements to the XMLHttpRequest implementation, including adding `Blob` and `ArrayBuffer` support.

### Changed

- For Key Press extensions, there is now a 100ms delay after each key press.
- Updated the versions of some of the bundled npm libraries for JavaScript extensions. (There should be no breaking changes.)

## PopClip 2021.11 (3785)

### Added

- PopClip will now load either JSON (`Config.json`) or YAML (`Config.yaml`) as an alternative to an XML Property List (`Config.plist`) for the extension config file. The same field names are used in each of the three formats, and they each define the same logical structure. The choice of format is just a matter of which you prefer. (I'm currently leaning towards YAML for the best readability.)
- Field names for use in the Config files are now defined in a spaced lowercase form such as `applescript file`. However, PopClip will accept field names in all common forms including the original "spaced capitalized" form (e.g. `AppleScript File`) and camel case (e.g. `applescriptFile`).
- The `URL` field for Search extensions will now accept `***` in addition to `{popclip text}` as the placeholder.
- The text-based icon format has a new "magnifying glass" style, intended for search extensions.
- The text-base icon specification format has changed since 2021.10 (see README).
- The `Script Interpreter` can now be specified as a bare executable name (e.g. `perl`), and PopClip will locate the tool in the `PATH` of the user's default shell.
- Added a new field called `AppleScript`, allowing AppleScripts to be specified as a verbatim text string in the config file (rather than as a separate file via `AppleScript File`).
- Allow key combos to be specified as a text string, for example `command option T`.
- Added an `emails` requirement to specify one or more email addresses.
- Added `POPCLIP_EMAILS` and `POPCLIP_PATHS` fields.
- Added Shortcut action type, to run a named Shortcut on macOS 12.0.
- Added JavaScript action type.

### Changed

- Removed the `Extension ...` and `Option ...` prefixes from field names (e.g. `Extension Name` is now just `Name`). The old names will continue to work.
- The extension's `Identifier` and/or `Name` are now optional. If either is omitted, popclip will generate one from the .popclipext package name.
- An action's `Title` is now optional. If omitted, the action takes the extension's name as its title.
- An action's `Icon` is now optional. If omitted, the action takes the extension's icon (if any) as its icon.
- The `Actions` array is now optional. An extension with a single action may now be specified at the top level of the config file, without a separate action dictionary.
- Renamed `Blocked Apps` to `Excluded Apps`, `Regular Expression` to `Regex`, `Pass HTML` to `Capture HTML`, `Required Software Version` to `PopClip Version`, and `Required OS Version` to `MacOS Version`. The old names will continue to work.
- Renamed the requirements `httpurl` and `httpurls` to `url` and `urls`.
- When URLs without a scheme prefix are detected in text, PopClip now defaults to https instead of http.
- Changed the text icon specification format. (Docs todo.)

### Note

My goal with these recent changes is to drastically lower the barrier of entry for users creating their own extensions. The changes mean that extensions can now be defined with fewer fields and less structure.

As the cherry on top of that, PopClip now has a new built in action for installing extensions from selected text. It activates when you select text starting with `# popclip` followed by a YAML extension definition. The extension must be a URL, Service or Key Press extension. Here is an example:

```yaml
# popclip extension to search Emojipedia
name: Emojipedia
icon: search filled E
url: https://emojipedia.org/search/?q=***
```

This means simple extensions can be shared simply by plain text in emails, on websites etc. Extensions shared this way don't also show an unsigned extension warning.

There is limit of 1000 characters for this. (If you are doing anything requiring more than that, you should probably be creating a packaged extension.)

## PopClip 2021.10 (3543)

### Added

- Executable shell scripts now have the user's `PATH` set in the script variables.
- Brought back `Preserve Image Color`.

### Changed

- The `App` specifier can now be set on individual actions as well as at the root level.

### Deprecated

- ~~The `Script Interpreter` field is deprecated.~~ _Reverted - see later changes to this field._

## PopClip 2021.9 (3510)

### Added

- PopClip now supports SVG image files as well as allowing you to specify an image as a SF Symbols identifier or to generate an icon from up to 3 letters of text.
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
- ~~Removed the `Restore Pasteboard` option. PopClip now always restores the pasteboard, unless using the `*-result` keys.~~
- Removed the `Long Running` option. All extensions are now assumed to be potentially long running.

### Changed

- The `POPCLIP_HTML` field is now sanitized to remove CSS, potentially unsafe tags, and to fix invalid markup. The unsanitized HTML is still available in a new field `POPCLIP_RAW_HTML`.
- Renamed the `Image File` and `Extension Image File` fields to `Icon` and `Extension Icon`, respectively. (The old names will also still work but are no longer documented.)
- Added `App` dictionary field to specify a single app (since it turns out we hardly ever need to specify more than one app). (`Apps` array will still work but is no longer documented.)
- The error checking when loading an extension is more robust, so errors such as incorrect field types will now be caught. And you'll get an more specific message about what the problem is.

One more thing... there is also a brand new extension format based on JavaScript. Documentation still "to-do", watch this space!
