# PopClip Extensions

This document applies to PopClip 2022.5 (3895). See also: [Changelog](CHANGELOG.md)

NEW: Check the [**PopClip Forum**](https://forum.popclip.app/) to keep up-to date about extensions development, to ask questions, and to help others.

## Table of Contents

- [PopClip Extensions](#popclip-extensions)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
    - [License](#license)
    - [Credits](#credits)
    - [Repository Layout & Contributing](#repository-layout--contributing)
    - [Extension Signing](#extension-signing)
    - [Debug Output](#debug-output)
  - [Extension Snippets](#extension-snippets)
    - [Extension Snippets Examples](#extension-snippets-examples)
  - [Anatomy of a PopClip Extension](#anatomy-of-a-popclip-extension)
    - [Types of Actions](#types-of-actions)
    - [Filtering](#filtering)
    - [The .popclipext package](#the-popclipext-package)
    - [About .popclipextz files](#about-popclipextz-files)
    - [The Config file](#the-config-file)
    - [Field names](#field-names)
  - [Icons](#icons)
    - [Text-based icons](#text-based-icons)
    - [Examples of symbols and text-based icons](#examples-of-symbols-and-text-based-icons)
  - [The Config file structure](#the-config-file-structure)
    - [About the "Localizable String" type](#about-the-localizable-string-type)
    - [Extension properties](#extension-properties)
    - [Action properties](#action-properties)
    - [Shortcut actions](#shortcut-actions)
    - [Service actions](#service-actions)
    - [URL actions](#url-actions)
    - [Key Press actions](#key-press-actions)
      - [Key Combo String Format](#key-combo-string-format)
    - [AppleScript actions](#applescript-actions)
      - [The `call` array](#the-call-array)
      - [AppleScript format](#applescript-format)
      - [Example plain text AppleScript with placeholder strings](#example-plain-text-applescript-with-placeholder-strings)
      - [Example of calling an AppleScript handler with parameters](#example-of-calling-an-applescript-handler-with-parameters)
      - [Using JXA Scripts](#using-jxa-scripts)
    - [Shell Script actions](#shell-script-actions)
      - [Example Shell Script Files](#example-shell-script-files)
      - [Shell Script Testing](#shell-script-testing)
    - [JavaScript actions](#javascript-actions)
      - [The JavaScript Engine](#the-javascript-engine)
      - [Error handling and debugging](#error-handling-and-debugging)
      - [Asynchronous operations and async/await](#asynchronous-operations-and-asyncawait)
      - [Network access from JavaScript](#network-access-from-javascript)
      - [About TypeScript and .ts files](#about-typescript-and-ts-files)
      - [JavaScript testing](#javascript-testing)
      - [JavaScript language reference](#javascript-language-reference)
  - [Meanings of particular fields](#meanings-of-particular-fields)
    - [The `requirements` array](#the-requirements-array)
      - [Note on side effect of requirements field](#note-on-side-effect-of-requirements-field)
    - [The `before` and `after` strings](#the-before-and-after-strings)
    - [The `app` dictionary](#the-app-dictionary)
    - [The `options` array](#the-options-array)
  - [Using Scripts](#using-scripts)
    - [Script Fields](#script-fields)
    - [Indicating Errors](#indicating-errors)
  - [Field name mapping](#field-name-mapping)

## Introduction

PopClip Extensions add extra actions to [PopClip](http://pilotmoon.com/popclip).

![Screenshot showing extensions in use.](https://raw.github.com/pilotmoon/PopClip-Extensions/master/docs-assets/example.png)

This repository contains the documentation for making your own extensions (this readme file) as well as the source files for the extensions published on the official [PopClip Extensions](http://pilotmoon.com/popclip/extensions) page.

### License

All extension source files are published under the MIT License (see [LICENSE.txt](/LICENSE.txt)) unless noted otherwise in the readme files of individual extensions.

### Credits

All the extensions and documentation were created by Nick Moore, except where stated. Individual extension credits are included in a readme file with the extension.

### Repository Layout & Contributing

The important folders:

- `source` - sources for the published extensions (maintained and supported by me)
- `source-contrib` - folder for user-submitted and experimental extensions
- `extensions` - signed and zipped `.popclipextz` files built from the `source` and `source-contrib` folders

Bugfixes and new extension submissions are welcome via pull request. Please note the following:

- New extensions should be submitted as source files in a `.popclipext` folder inside the `source-contrib` folder.
- Please do not submit any zipped `.popclipextz` files.
- By contributing to this repo, you agree that your contribution may be published at [PopClip Extensions](https://pilotmoon.com/popclip/extensions/).
- Submitting an extension does not guarantee publication on the website.
- I may make changes to any extension submitted.

A good place to tell PopClip users about your work is the [Show and Tell](https://forum.popclip.app/c/show-and-tell/16) section in the PopClip forum.

### Extension Signing

By default, PopClip will display a warning dialog when you try to install your own extension, because it is not digitally signed.

![Example unsigned warning.](https://raw.github.com/pilotmoon/PopClip-Extensions/master/docs-assets/ext_warning.png)

If you find this gets annoying while you are testing your work, you can turn off the warning. Run the following command at the Terminal, then Quit and restart PopClip:

```zsh
defaults write com.pilotmoon.popclip LoadUnsignedExtensions -bool YES
```

Please be aware that PopClip extensions can contain arbitrary executable code. Be careful about the extensions you create, and be wary about loading extensions you get from someone else.

(PopClip will never load unsigned extensions whose identifier has a `com.pilotmoon.` prefix, which is reserved for 'official' extensions. When basing your own extension off such an extension, you will need to change the identifier.)

### Debug Output

To help you when creating extensions, PopClip can be configured to write script output and debug info to be viewed with the Console app. To enable it, run this command in Terminal, then Quit and restart PopClip:

```zsh
defaults write com.pilotmoon.popclip EnableExtensionDebug -bool YES
```

## Extension Snippets

PopClip 2021.11 supports a new, simplified way to create and share simple extensions called "Extension Snippets".

Here is an example extension snippet:

```yaml
# popclip extension to search Emojipedia
name: Emojipedia
icon: search filled E
url: https://emojipedia.org/search/?q=***
```

When you select the above text, PopClip will offer an "Install Extension" action. Clicking it will install the above extension directly, without any need for config files or a .popclipext folder.

The format of a snippet is a simply a regular PopClip extension config in [YAML](https://quickref.me/yaml) format, with the addition of a comment header beginning with `# popclip` (with or without a space, not case sensitive).

All features of regular extensions can be used, with the limitation that additional files (such as icon files or scripts) cannot be included. Extension snippets can be a maximum of 1000 characters.

If the extension is of type Shortcut, Service, URL, Key Combo or JavaScript (without network entitlement), the extension snippet will install without the usual "unsigned extension" prompt. AppleScript snippets, and JavaScript snippets with the network entitlement, will still give the unsigned warning.

Full Shell Script extensions can't be expressed as snippets, although you can use an AppleScript to run a simple shell script as a string literal (see example below).

In the absence of an explicit `identifier` field, the extension is identified by its `name`. Installing another extension with the same name (or identifier) will overwrite an existing one.

### Extension Snippets Examples

A Shortcuts example:

```yaml
# popclip shortcuts example
name: Run My Shortcut
icon: symbol:moon.stars # Apple SF Symbols
macos version: '12.0' # shortcuts only work on Monterey and above!
shortcut name: My Shortcut Name
```

An AppleScript example, running a shell script:

```yaml
# popclip shellscript nested in an applescript 
name: Say
applescript: do shell script "say '{popclip text}'"
```

A multi-line AppleScript example (the pipe character begins a YAML multi-line string, and the following lines must all be indented with two spaces - not tabs!):

```yaml
# PopClip LaunchBar example
name: LaunchBar
icon: LB
applescript: | # pipe character begins a multi-line string
  tell application "LaunchBar"
    set selection to "{popclip text}"
  end tell
# the above lines are indented with two spaces. no tabs allowed in YAML!
```

A JavaScript example, including multiple actions:

```yaml
# popclip js + multi action example
name: Markdown Formatting
requirements: [text, paste]
actions:
- title: Markdown Bold # note: actions have a `title`, not a `name`
  icon: circle filled B
  javascript: popclip.pasteText('**' + popclip.input.text + '**')
- title: Markdown Italic
  icon: circle filled I
  javascript: popclip.pasteText('*' + popclip.input.text + '*')  
```

A Key Press example:

```yaml
# popclip
name: Key Press Example
key combo: command option J
```

A Service example:

```yaml
# popclip
name: Make Sticky
service name: Make Sticky
```

A more complex Key Combo example with a raw key code and using some more fields:

```yaml
# popclip extension snippet - more complex example
name: Paste and Enter
icon: square monospaced ↵
requirements: [paste]
before: paste
key combo: 0x24 # see https://bit.ly/3wSkQ9I
```

## Anatomy of a PopClip Extension

### Types of Actions

There are seven kinds of actions supported by PopClip extensions.

| Action Type | Description | Example |
|------|-------------|---------|
|Shortcut|Send the selected text to a macOS Shortcut. (Requires macOS 12.0 Monterey.)| See snippets above. |
|Service|Send the selected text to a macOS Service.| [MakeSticky](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/MakeSticky)|
|URL|Open a URL, with the selected text URL-encoded and inserted.|[GoogleTranslate](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/GoogleTranslate)|
|Key Press|Press a key combination.| [Delete](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/Delete)|
|JavaScript|Run a JavaScript script.| [Sort](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/Sort) |
|AppleScript|Run an AppleScript script.|[BBEdit](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/BBEdit)|
|Shell Script|Run a shell script.| [Say](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/Say)

### Filtering

Extensions have access to the following filtering mechanisms, to help prevent actions appearing when they are not useful:

- Filter by matching a regular expression.
- Filter by application (either include or exclude).
- Filter by whether cut, copy or paste is available.
- Filter by whether the text contains a URL, email address or file path.
- Filter by the current values of the extensions's options.

### The .popclipext package

A PopClip extension consists of a configuration file called either `Config.json`, `Config.yaml` or `Config.plist`, plus (optional) additional files such as icons and scripts, all contained in a directory whose name ends with `.popclipext`. Such a directory will be treated as a package by Mac OS X. To view the contents of a package, right click it in Finder and choose 'Show Package Contents'.

If you double-click a `.popclipext` package, PopClip will attempt to load and install it. PopClip stores its installed extensions in `~/Library/Application Support/PopClip/Extensions/`.

Here is an example package structure, the 'Say' extension:

```text
    Say.popclipext                  -- Containing folder
       _Signature.plist             -- Signature (official Pilotmoon extensions only)
       Config.plist                 -- Main configuration file
       say.sh                       -- Script file
       speechicon.png               -- Icon file
```

### About .popclipextz files

For distribution, an extension package folder may be zipped and renamed with the extension `.popclipextz`. You can examine an existing PopClip extension by renaming it with a `.zip` extension and unzipping it, to reveal a `.popclipext` package.

### The Config file

Every extension must define a configuration dictionary. This can be provided in a file called either `Config.plist`, `Config.yaml`, `Config.json`, or `Config.js`.

| Format     | File Name      | Description                                                                              |
| ---------- | -------------- | ---------------------------------------------------------------------------------------- |
| plist      | `Config.plist` | An Apple [XML Property List](https://en.wikipedia.org/wiki/Property_list) (Plist) file.  |
| YAML       | `Config.yaml`  | A [YAML 1.2](https://yaml.org) file ([quickref](https://quickref.me/yaml)).              |
| JSON       | `Config.json`  | A [JSON](https://www.json.org/json-en.html) file ([quickref](https://quickref.me/json)). |
| JavaScript | `Config.js`    | A JavaScript source file exporting an object. (See #TODO).                               |

The Config file must define a single dictionary at its root, which defines the extension. Although the three formats are different, they all can be used to define a dictionary mapping string keys to values. The values can be strings, numbers, booleans, arrays or other dictionaries. (In this documentation the term 'field' is used to refer to a key/value pair in a dictionary.)

The choice of format does not affect the extension functionality in any way, so you can choose whichever format you prefer to work with. (Plist was the original config file format for PopClip extensions for many years, and the JSON and YAML formats were added later.)

### Field names

Field names in this document are given in a lowercase form with words separated by spaces, such as `required apps`. However, PopClip will treat field names in any of the following formats as equivalent:

- Lowercase with spaces: e.g. `required apps`
- Mixed case with spaces: e.g. `Required Apps` (this is the original naming format prior to PopClip 2021.11)
- Camel case:  e.g. `requiredApps`
- Pascal case:  e.g. `RequiredApps`
- Snake case:  e.g. `required_apps`
- Kebab case:  e.g. `required-apps`
- Constant case:  e.g. `REQUIRED_APPS`

Rules for transformation are as defined by [case-anything](https://github.com/mesqueeb/case-anything), which PopClip uses.

Older versions of PopClip used different names for some fields. Where there is a new name, the old name is also still accepted. A table of old and new is given in [Field name mapping](#field-name-mapping).

## Icons

Icons may be specified in the `icon` fields in a few different ways:

- **As a filename:** `<filename>.png` or `<filename>.svg` specifies an image file within the extension package, in either PNG or SVG format. You can create your own with an image editor, or you could use icons from a website like [The Noun Project](https://thenounproject.com) or the macOS app [IconJar](https://geticonjar.com/resources/). Please include any applicable copyright attribution in a README file.

- **As an SF Symbol:** `symbol:<symbol name>` specifies an [SF Symbols](https://sfsymbols.com) identifier, for example `symbol:flame`. Symbols are only available on macOS 11.0 and above. Also note that some symbols require higher macOS versions as indicated in the "Availability" panel in Apple's SF Symbols browser app. (If the symbol does not exist on the version of macOS the user is running, it will be as if no icon was specified. Therefore, you should specify an appropriate `macos version` when using a symbol icon.)

- **As a text-based icon:** Using a special format, you can instruct PopClip to generate a text-based icon (see below).

PNG and SVG icons should be square and monochrome. The image should be black, on a transparent background. You can use opacity to create shading. PNG icons should be at least 256x256 pixels in size.

### Text-based icons

Text-based icons can up to three characters, on their own or within an enclosing shape. They are specified by space-separated keywords followed by the characters to draw.

The following keywords define an enclosing shape (only one of these should be included):

| Keyword      | Effect                                                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `text`       | Draw the text on its own, without a shape. This is the default if no shape keyword is specified.                                |
| `square`     | Encloses text in a round-cornered square.                                                                                         |
| `circle`     | Encloses text in a circle.                                                                                                      |
| `search`     | Encloses text in a magnifying glass shape.                                                                                      |

The following keywords modify the way the text is drawn:

| Keyword      | Effect                                                                                                                                                   |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `filled`     | Specifies a solid filled shape (default is an outline shape).                                                                                            |
| `monospaced` | Specifies that the text be drawn in a monospaced font (default is variable-width font). Punctuation characters often render better in a monospaced font. |

### Examples of symbols and text-based icons

| Text String                   | Icon Generated                                                                                                                                                 |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `symbol:flame`                | <img src="https://raw.githubusercontent.com/pilotmoon/PopClip-Extensions/master/docs-assets/texticons/symbol-flame.png" width="20" height="20">                |
| `symbol:hand.raised`          | <img src="https://raw.githubusercontent.com/pilotmoon/PopClip-Extensions/master/docs-assets/texticons/symbol-hand.raised.png" width="20" height="20">          |
| `symbol:signpost.right`       | <img src="https://raw.githubusercontent.com/pilotmoon/PopClip-Extensions/master/docs-assets/texticons/symbol-signpost.right.png" width="20" height="20">       |
| `A` or `text A`               | <img src="https://raw.githubusercontent.com/pilotmoon/PopClip-Extensions/master/docs-assets/texticons/A.png" width="20" height="20">                           |
| `circle 1`                    | <img src="https://raw.githubusercontent.com/pilotmoon/PopClip-Extensions/master/docs-assets/texticons/circle_1.png" width="20" height="20">                    |
| `circle filled 本`             | <img src="https://raw.githubusercontent.com/pilotmoon/PopClip-Extensions/master/docs-assets/texticons/circle_filled_本.png" width="20" height="20">             |
| `square xyz`                  | <img src="https://raw.githubusercontent.com/pilotmoon/PopClip-Extensions/master/docs-assets/texticons/square_xyz.png" width="20" height="20">                  |
| `square filled !`             | <img src="https://raw.githubusercontent.com/pilotmoon/PopClip-Extensions/master/docs-assets/texticons/square_filled_!.png" width="20" height="20">             |
| `square filled monospaced ()` | <img src="https://raw.githubusercontent.com/pilotmoon/PopClip-Extensions/master/docs-assets/texticons/square_filled_monospaced_().png" width="20" height="20"> |
| `search E`                    | <img src="https://raw.githubusercontent.com/pilotmoon/PopClip-Extensions/master/docs-assets/texticons/search_E.png" width="20" height="20">                    |
| `search filled monospaced £`  | <img src="https://raw.githubusercontent.com/pilotmoon/PopClip-Extensions/master/docs-assets/texticons/search_filled_monospaced_£.png" width="20" height="20">  |

As a handy tool, the extension [IconPreview.popclipextz](https://github.com/pilotmoon/PopClip-Extensions/blob/master/extensions/IconPreview.popclipextz?raw=true) in this repo will display the icon for a text string you select.

<img src="https://raw.githubusercontent.com/pilotmoon/PopClip-Extensions/master/docs-assets/iconpreview.gif" width="200">

## The Config file structure

### About the "Localizable String" type

Fields shown as "Localizable String" may be either a string or a dictionary. If you supply a string, that string is always used. If you supply a dictionary mapping language codes (`en`, `fr`, `zh-hans`, etc.) to a string, PopClip will display the string for the user's preferred language if possible, with fallback to the `en` string.

### Extension properties

The following fields are used at the top level of the configuration to define properties of the extension itself. All fields are optional.

|Key|Type|Description|
|---|----|-----------|
|`name` |Localizable String| This is a display name that appears in the preferences list of extensions. If omitted, a name is generated automatically from the `.popclipext` package name.|
|`icon` |String|See [Icons](#icons). If you omit this field, the icon for the first action will be used (if any), or else no icon will be displayed. |
|`identifier` |String| You may provide an identifier string here to uniquely identify this extension. Use your own prefix, which could be a reverse DNS-style prefix based on a domain name you control `com.example.myextension`. (Do not use the prefix `com.pilotmoon.` for your own extensions.)If you omit this field, PopClip will identify the extension by its package name (e.g. `Name.popclipext`) instead.|
|`description`|Localizable String|A short, human readable description of this extension. Appears on the web site but not in the app.|
|`macos version` |String|Minimum version number of Mac OS X needed by this extension. For example `10.8.2` or `11.0`.|
|`popclip version` |Integer|Minimum PopClip version required. This is the build number, as shown in brackets in the about pane. You should specify `3895` for new extensions based on this document.|
|`options`|Array|Array of dictionaries defining the options for this extension, if any. See [The `options` array](#the-options-array).|
|`options title`|Localizable String|Title to appear at the top of the options window. Default is `Options for <extension name>`.|
|`entitlements`|Array|Only applies to JavaScript extensions. The possible values are `network` (allows use of XMLHttpRequest) and `dynamic` (allows dynamically generated actions).|
|`action`|Dictionary|A dictionary defining a single action for this extension. See [Action properties](#action-properties).|
|`actions`|Array|Array of dictionaries defining the actions for this extension.|

If neither `actions` nor `action` is defined, PopClip will look at the top level of the plist for an action definition.

### Action properties

The following fields define properties common to all actions. All fields are optional.

|Key|Type|Required?|Description|
|---|----|---------|-----------|
|`title`|Localizable String|The title is displayed on the action button if there is no icon. For extensions with icons, the title is displayed in the tooltip. If omitted, the action will take the extension name as its title.|
|`icon`|String| The icon to show on the action button. See [Icons](#icons) for the icon specification format. To explicitly specify no icon, set this field either to boolean `false` (in a plist) or to `null` (in JSON/YAML).|
|`identifier`|String|A string to identify this action. In shell script and AppleScript actions, the identifier is passed to the script.|
|`requirements`|Array|Array consisting of zero or more of the strings listed in [the `requirements` array](#the-requirements-array). All the requirements in the array must be satisfied. If the array is omitted, the requirement `text` is applied by default.|
|`before`|String|String to indicate an action PopClip should take *before* performing the main action. See [The `before` and `after` strings](#the-before-and-after-strings).|
|`after`|String|String to indicate an action PopClip should take *after* performing the main action. See [The `before` and `after` strings](#the-before-and-after-strings).
|`excluded apps`|Array|Array of bundle identifiers of applications. The action will not appear when PopClip is being used in any of the the specified apps.|
|`required apps`|Array|Array of bundle identifiers of applications. The action will only appear when PopClip is being used in one of the specified apps. *Note: This field does not make PopClip do a check to see if the app is present on the computer. For that, use the `App` field.*|
|`regex`|String|A [Regular Expression](http://regularexpressions.info/) to be applied to the selected text. The action will appear only if the text matches the regex, and the matching part of the text is passed to the action. The regex engine used is Cocoa's `NSRegularExpression`, which uses the [ICU specification](https://unicode-org.github.io/icu/userguide/strings/regexp.html) for regular expressions. *Note: There is no need to use your own regex to match URLs, email addresses or file paths. Use one of the `requirements` keys `url`, `urls`, `email`, `emails` or `path` instead. Also be careful to avoid badly crafted regexes which never terminate against certain inputs.*|
|`app`|Dictionary|Information about the app or website associated with this action. You can use this field to, optionally, specify that a certain app must be present on the system for the action to work. See [The `app` dictionary](#the-app-dictionary).|
|`stay visible`|Boolean|If `true`, the PopClip popup will not disappear after the user clicks the action. (An example is the Formatting extension.) Default is `false`.|
|`capture html`|Boolean|If `true`, PopClip will attempt to capture HTML and Markdown for the selection. PopClip makes its best attempt to extract HTML, first of all from the selection's HTML source itself, if available. Failing that, it will convert any RTF text to HTML. And failing that, it will generate an HTML version of the plain text. It will then generate Markdown from the final HTML. Default is `false`.|
|`preserve image color`|Boolean|If true, the supplied icon will be displayed with its original color instead of being filled in white/black. Default is `false`.|
|`restore pasteboard`|Boolean|If true, then PopClip will restore the pasteboard to its previous contents after pasting text in the `paste-result` after-step. Default is `false`.|

Additionally, there will be action-specific properties as described in the sections below.

### Shortcut actions

In a Shortcut action, PopClip will invoke a [Shortcut](https://support.apple.com/en-gb/guide/shortcuts-mac/apdf22b0444c/mac) by name. Shortcuts are only available on macOS 12.0 and above.

A shortcut action is defined by the presence of a `shortcut name` field, as follows:

|Key|Type|Description|
|---|----|-----------|
|`shortcut name`|String|The name of the macOS Shortcut to call. The name is whatever it is called in the Shortcuts app.|

The selected text will be sent as input to the service, and any text returned by the shortcut will be available to the `after` action.

### Service actions

In a Service action, PopClip will invoke a named macOS System Service, passing it the selected text.

A service action is defined by the presence of a `service name` field, as follows:

|Key|Type|Description|
|---|----|-----------|
|`service name`|String|The name of the macOS service to call. |

The name is as shown in the Services menu, for example `Add to Deliveries`. In some cases, you may need to look into the Info.plist of the application to find the name defined in there under `NSServices` → `NSMenuItem`. An example of this is the `Make New Sticky Note` service which must be called as `Make Sticky`.

### URL actions

In a URL action, PopClip will open a URL in the default browser (or if the current app is a known browser, in the current app). PopClip can open any type of URL, not just web URLs.

A URL action is defined by the presence of a `url` field, as follows:

|Key|Type|Description|
|---|----|-----------|
|`url`|String|The URL to open when the user clicks the action. Use `{popclip text}` as placeholder for the selected text. The inserted string will be automatically URL-encoded by PopClip. |

You can also put options in the URL, in the same format as for AppleScripts. For example, `http://translate.google.com/#auto%7C{popclip option language}%7C{popclip text}`.

The string `***` will work as a shorthand for `{popclip text}`.

### Key Press actions

In a Key Press action, PopClip will simulate a key press, or sequence of presses, as if it was performed by the user.

A Key Press action is defined by the presence of a `key combo` or `key combos` field, as follows:

| Key          | Type    | Description                                                                                                     |
| ------------ | ------- | --------------------------------------------------------------------------------------------------------------- |
| `key combo`  | String  | The key combination to press, as defined in [Key Combo String Format](#key-combo-string-format).                |
| `key combo`  | Integer | If a number is given, it is interpreted directly as a virtual key code (see below).                             |
| `key combos` | Array   | Instead of a single key combo, you can supply array of them. PopClip will press all the key combos in sequence. |

#### Key Combo String Format

The string format is a convenient human-readable format that can specify a key and modifiers. It is a space-separated list of one or more modifiers (the order does not matter), followed by the key to press. The key combo string is not case sensitive.

Some examples:

- `command b` or `command B`- *Hold command, and press 'b' key*
- `option shift .` - *Hold option and shift, and press the dot key*
- `command space` - *Hold command, and press space bar*
- `f1` - *The F1 key on its own with no modifiers*
- `option 0x4b` - *0x4b is the hex numeric code for 'Keypad Divide'*

The **key** is specified in one of the following ways:

- **As a character.** For keys which produce a single character. Examples: `A`, `;`, `9`.
- **As a key name.** The following are supported: `return`, `space`, `delete`, `escape`, `left`, `right`, `down`, `up`, and `f1`, `f2`, etc. to `f19`.
- **As a virtual key code.** For more esoteric keys, you can specify the virtual key code numerically. This can be as a decimal number, or a hexadecimal number (starting with `0x`). [This StackOverflow question](http://stackoverflow.com/questions/3202629/where-can-i-find-a-list-of-mac-virtual-key-codes) will help you find the virtual key codes for all the keys.

The **modifiers** are specified with the following keywords:

| Modifier    | Keyword                  |
| ----------- | ------------------------ |
| Command (⌘) | `command`, `cmd` or `⌘`  |
| Option (⌥)  | `option`, `opt` or `⌥`   |
| Control (⌃) | `control`, `ctrl` or `^` |
| Shift (⇧)   | `shift` or `⇧`           |

### AppleScript actions

An AppleScript action is defined by the presence of either an `applescript`, `applescript file` field, with optional `call` field, as follows:

|Key|Type|Description|
|---|----|-----------|
|`applescript`|String|A text string to interpret directly as AppleScript source.|
|`applescript file`|String|File name of an `.applescript` or `.scpt` file to run.|
|`call`|Array of Strings (optional)|Handler name and parameters.|

#### The `call` array

The `call` array specifies a named handler and its parameters.

- The first string in the array (required) specifies the name of the handler to call.
- Any subsequent strings (optional) specify the values to pass as parameters, as defined in [Script Fields](#script-fields). The number and order of parameters must match exactly what the handler expects to receive.

#### AppleScript format

PopClip can execute an AppleScript supplied either as a **plain text script** (`.applescript` file), or as a **compiled script** (`.scpt` file, created in the Script Editor app). The ways you can pass values to the script differ depending on the script type (see examples below).

The script may optionally return a string (e.g. `return "foo"`), and act on it with an `after` key. For returning errors, see [Indicating Errors](#indicating-errors).

#### Example plain text AppleScript with placeholder strings

Within a plain text script, you may use `{popclip text}` as a placeholder for the selected text. PopClip will replace the placeholder with the actual text before executing the script. Other placeholders are also available; see [Script Fields](#script-fields).

Here is an example `.applescript` file with placeholder strings:

```applescript
tell application "TextEdit"
 activate
 set theDocument to make new document
 set text of theDocument to ("{popclip text} - Clipped from {popclip browser url}")
end tell
```

#### Example of calling an AppleScript handler with parameters

Within a compiled script (`.scpt`), you cannot use placeholder strings. Instead, you need to put your code in a handler and pass values to it.

Here is a same example as above, but this time wrapped in a handler named 'newDocument' that takes two parameters.

```applescript
on newDocument(theText, theUrl) --this is a handler
  tell application "TextEdit"
    activate
    set theDocument to make new document
    set text of theDocument to (theText & " - Clipped from " & theUrl)
  end tell
end newDocument
```

And a `Config.json` file to call this might be:

```json
{
  "name": "TextEdit Clip",
  "applescript file": "example.scpt",
  "call": ["newDocument", "text", "browser url"]
}
```

#### Using JXA Scripts

Note that when using a compiled script, these can be be 'JavaScript for Automation' (JXA) scripts instead of AppleScripts. Everything works the same except 'handlers' correspond to top level JXA functions. JXA cannot be used in plain text scripts. 

An example of an extension using a JXA script is [TaskPaper](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/TaskPaper.popclipext).

### Shell Script actions

A Shell Script action is defined by the presence of a `shell script file` field, with an optional `script interpreter` field, as follows:

|Key|Type|Description|
|---|----|-----|
|`shell script file`|String (required)|The name of the shell script file to invoke. The file must exist in the extension's package. By default, the script is executed using `/bin/sh`. To use other scripting runtimes, either define a `script interpreter` or set the script's executable bit and include a shebang (e.g. `#!/usr/bin/env ruby`) at the top of the file.|
|`script interpreter`|String (optional)|Specify the interpreter to use for `shell script file`. For example `ruby`. PopClip will look for the named executable in the `PATH` of the user's default shell. Alternatively, you can specify the absolute path (starting with `/`).

The the current working directory will be set to the package directory. Within the script, access the selected text as `$POPCLIP_TEXT`, and other variables as described in [Script Fields](#script-fields). You can output a string to the standard output and have PopClip act upon it by defining an `after` key. For returning errors, see [Indicating Errors](#indicating-errors).

#### Example Shell Script Files

Here is a simple example shell script (this one is for 'Say'):

```sh
#!/bin/sh
echo $POPCLIP_TEXT | say  # pipe text to 'say' command
```

A shell script can return a string back to PopClip via stdout. For example:

```sh
#!/bin/sh
echo "Hello, ${POPCLIP_TEXT}!"  # echo to stdout
```

A ruby example:

```ruby
#!/usr/bin/env ruby
input=ENV['POPCLIP_TEXT']
print input.upcase  # make the text ALL CAPS
```

#### Shell Script Testing

While developing a script, you can test it from the command line by setting the required variables in the call. For example:

```shell-script
POPCLIP_TEXT="my test text" POPCLIP_OPTION_FOO="foo" ./myscript
```

Or export them before calling the script:

```shell-script
export POPCLIP_TEXT="my test text"
export POPCLIP_OPTION_FOO="foo"
./myscript
```

### JavaScript actions

*Note: JavaScript extensions are brand new and it will take me some time to document everything fully. The following gives the basics. Please bear with me!*

***A note on "module-based" extensions:** There is a further kind of extension I am calling a module-based extension. In a module-based extension, the extension itself is defined by a JavaScript module. This allows greater flexibility and customization of the extension, at the cost of being more complex to explain and to use. This section describes how JavaScript fits in to the "classic" extension structure, which is the easiest to explain and to use for simple tasks.*

A JavaScript action is defined by the presence of either a `javascript file` field or a `javascript` field, as follows:

|Key|Type|Description|
|---|----|-----------|
|`javascript file`|String|The name of the JavaScript file to run, for example `foo.js`.  
|`javascript`|String|A text string to run as a JavaScript. For example: `popclip.showText('Hello world!')`|

PopClip loads the file (or the string) and evaluates it as if it were wrapped in an async function call. Scripts can by return results by finishing with a return statement. A quick example (Config.yaml):

```yaml
# popclip (this is exactly how the published Uppercase extension works)
name: Uppercase
icon: square filled AB
javascript: return popclip.input.text.toUpperCase()
after: paste-result
```

JS scripts have access to PopClip's state and can perform actions, via the properties and methods of the `popclip` global object. There is draft documentation here: [PopClip Extensions JavaScript Reference](https://pilotmoon.github.io/PopClip-Extensions/).

Here is a quick reference for some commonly needed stuff:

- `popclip.input.text` - the full selected text
- `popclip.input.matchedText` - the part of the text matching the requirement or regex
- `popclip.input.html` - the html backing the selection (needs `captureHtml` field set)
- `popclip.input.markdown` - the markdownified html (needs `captureHtml` field set)
- `popclip.input.data.urls` - array of detected web URLs (similar to `POPCLIP_URLS` in shell scripts)
- `popclip.context.browserUrl` and `popclip.context.browserTitle` - hopefully self-explanatory
- `popclip.modifiers.command`, `popclip.modifiers.option`, `popclip.modifiers.shift`, `popclip.modifiers.control` - booleans for modifier keys pressed
- `popclip.pasteText('string')` - paste the string (similar to `paste-result`)
- `popclip.copyText('string')` - copy the string (similar to `copy-result`)
- `popclip.showText('string')` - show the string (similar to `show-result`)
- [`popclip.openUrl()`](https://pilotmoon.github.io/PopClip-Extensions/interfaces/PopClip.html#openUrl) - open a URL, similar to a URL extension
- [`popclip.pressKey()`](https://pilotmoon.github.io/PopClip-Extensions/interfaces/PopClip.html#pressKey) - presses a key combo, similar to a key press extension
- `print()` - global debug printing function

#### The JavaScript Engine

PopClip's JavaScript engine is Apple's [JavaScriptCore](https://developer.apple.com/documentation/javascriptcore), which is part of macOS. The available language features and core libraries depend on which version of macOS PopClip is running on. The minimum requirement for PopClip is currently macOS 10.13.6, and scripts can assume it is safe to use all features marked as "Safari 10.1" and below in MDN ([example](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function#browser_compatibility)), which corresponds to ES2017 specification. Newer language features may be available on higher versions of macOS.

#### Error handling and debugging

In general you don't need to worry too much about catching and handling errors. If the script throws an error, PopClip simply shows the shaking-'X'. Debug output can be viewed in the console as described in [Debug Output](#debug-output).

#### Asynchronous operations and async/await

Usually, the JavaScript code will be run synchronously (i.e., as a single code block that PopClip waits to finish). However PopClip provides implementations of `XMLHttpRequest` and `setTimeout`, which are asynchronous. If a script uses these, PopClip will show its spinner and wait until the last asynchronous operation has finished. During asynchronous operations, clicking PopClip's spinner will cancel all current operations.

The returned value from the script (if any) is the return value of the last function to complete. For example:

```yaml
# popclip setTimeout example
name: setTimeout Test
javascript: | 
  setTimeout(() => { 
    return 'bar'
  }, 1000) // 1 second delay
  return 'foo'
after: show-result # result shown will be 'bar', not 'foo'
```

You can also use the `await` keyword when calling any function that returns a Promise. Internally, PopClip runs all the code you supply wrapped in an `async` function call, and resolves any returned promises itself.

As a convenience, PopClip also supplies a global function `sleep(delayInMilliseconds)` as a promise-based wrapper around `setTimeout`:

```yaml
# popclip await example
name: Await Test
javascript: | 
  await sleep(5000) // 5 second delay
  popclip.showText('Boo!')
```

#### Network access from JavaScript

PopClip provides its own implementation of XMLHttpRequest (XHR). To use it, you need to include the `network` entitlement in the `entitlements` field of the config file.

PopClip is also bundled with the HTTP library [axios](https://axios-http.com/docs/intro) version 0.26.1, which you can load using `const axios = require('axios')`. This is a lot easier to use than XHR.

Some limitations to be aware of:

- Due to macOS's App Transport Security, PopClip can only access https URLs. Attempting to access http URLs results in a network error from XHR.
- PopClip's implementation of XHR currently can only download text MIME types. Binary data will fail.

Here's an example extension snippet that downloads a selected URL's contents, and copies it to the clipboard:

```yaml
# popclip JS network example
name: Download Text
icon: symbol:square.and.arrow.down.fill
requirements: [url]
entitlements: [network]
javascript: |
  const axios = require('axios')
  const response = await axios.get(popclip.input.data.urls[0]) // throws for non-2xx status
  return response.data
after: copy-result
```

For a more substantial axios example, see for example [Instant Translate](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/InstantTranslate).

#### About TypeScript and .ts files

When looking at the extensions in this repo I have made, you will see `.ts` files. These are [TypeScript](https://www.typescriptlang.org/) source code, which compiles down to JavaScript. I prefer to use TS than raw JS as it helps me to write correct code, aided by the TypeScript definitions file [popclip.d.ts](/popclip.d.ts). The TypeScript configuration I use is in [tsconfig.json](/tsconfig.json).

#### JavaScript testing

PopClip has a 'test harness' mode, which runs JavaScript files in the PopClip environment from the command line. It is useful for running unit tests of
your code in PopClip's environment, with the same libraries, globals etc. It is activated by calling PopClip's executable (inside the PopCLip.app package) with the parameter `runjs` followed by the file name to run.

```shell-script
/Application/PopClip.app/Contents/MacOS/PopClip runjs test.js
```

Some notes:

- When running in the test harness, the `popclip` global is not available.
- Scripts can output strings with the global `print()` function (not `console.log()`).
- Scripts running in the test harness always have the network access entitlement.

#### JavaScript language reference

There are loads of JavaScript language references out there, but the one I use and recommend is [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference).

## Meanings of particular fields

### The `requirements` array

These are the values supported by the `requirements` array. Additionally, you can prefix any requirement with `!` to negate it.

|Value|Description|
|-----|-----------|
|`text`|One or more characters of text must be selected.|
|`copy`|Synonym for `text` (for backward compatibility).|
|`cut`|Text must be selected and the app's Cut command must be available.|
|`paste`|The app's Paste command must be available.|
|`url`|The text must contain exactly one web URL (http or https). *(see side effects below)*|
|`urls`|The text must contain one or more web URLs (https or https).|
|`email`|The text must contain exactly one email address. *(see side effects below)*|
|`emails`|The text must contain one or more email addresses.|
|`path`|The text must be a local file path, and it must exist on the local file system. *(see side effects below)*|
|`formatting`|The selected text control must support formatting. (PopClip makes its best guess about this, erring on the side of a false positive.)|
|`option-*=#`|The option named `*` must be equal to the string `#`. For example `option-fish=shark` would require an option named `fish` to be set to the value `shark`. This mechanism allows actions to be enabled and disabled via options.|

#### Note on side effect of requirements field

When using a `url`, `email` or `path` requirement, the text passed to the action will be modified.

- For `url` requirement, only the matching URL will be passed, and it will be expanded to its full form, with `https://` prepended if no scheme is specified. For example, if the selected text is `go to apple.com`, the text passed to the action will be `https://apple.com`.
- For `email` requirement, the only the matching email address will be passed to the action.
- For `path` requirement, only the matching path will be passed to the action, and it will be standardized form with `~` and `..` expanded. For example `~/Documents` will be passed as `/Users/username/Documents`.

In all three cases, actions can assume that their input is a valid web URL, email address or path.

Shell Scripts and AppleScripts can still access the original text in the `POPCLIP_FULL_TEXT` and `{popclip full text}` fields. JavaScript actions will find the modified text as `popclip.input.matchedText` and the full text as `popclip.input.text`.

### The `before` and `after` strings

The `cut`, `copy` and `paste` keys can be used as the `before` string. All the values can be used as the `after` string.

|Value|Description|
|-----|-----------|
|`copy-result`|Copy the text returned from the script to the clipboard. Displays "Copied" notification.|
|`paste-result`|If the app's Paste command is available, paste the text returned from the script, as well as copy it to the clipboard. Otherwise, copy it as in `copy-result`.|
|`preview-result`|Copy the result to the pasteboard and show the result to the user, truncated to 160 characters. If the app's Paste command is available, the preview text can be clicked to paste it.|
|`show-result`|Copy the result to the pasteboard and show it to the user, truncated to 160 characters. |
|`show-status`|Show a tick or an 'X', depending on whether the script succeeded or not.|
|`cut`|Invoke app's Cut command, as if user pressed ⌘X.|
|`copy`|Invoke app's Copy command, as if user pressed ⌘C.|
|`paste`|Invoke app's Paste command, as if user pressed ⌘V.|
|`paste-plain`|Reduce the current clipboard to plain text only, then invoke app's Paste command.|
|`popclip-appear`|Trigger PopClip to appear again with the current selection. (This is used by the Select All extension.)|
|`copy-selection`|Place the original selected text to the clipboard. (This is used by the Swap extension.)|

### The `app` dictionary

The `app` field is a dictionary with the following stricture:

|Key|Type|Required?|Description|
|---|----|---------|-----------|
|`name`|String|Required|Name of the app which this extension interacts with. For example `Evernote` for an Evernote extension.|
|`link`|String|Required|Link to a website where the user can get the app referred to in `Name`. For example `https://evernote.com/`.|
|`check installed`|Boolean|Optional|If `true`, PopClip will check whether an app with one of the given `Bundle Identifiers` is installed when the user tries to use the extension. None is found, PopClip will show a message and a link to the website given in `Link`. Default is `false`.|
|`bundle identifiers`|Array|Required if `check installed` is `true`|Array of bundle identifiers for this app, including all application variants that work with this extension. In the simplest case there may be just one bundle ID. An app may have alternative bundle IDs for free/pro variants, an App Store version, a stand-alone version, a Setapp version, and so on. Include all the possible bundle IDs that the user might encounter.|

### The `options` array

Options are presented to the user in a preferences user interface window and are saved in PopClip's preferences on behalf of the extension. Options appear in the UI in the order they appear in the `options` array. An option dictionary has the following structure.

|Key|Type|Required?|Description|
|---|----|---------|-----------|
|`identifier`|String|Required|Identifying string for this option. This is passed to your script. The identifier will be downcased or upcased for AppleScript and Shell Script targets, respectively — see [Script Fields](#script-fields).|
|`type`|String|Required|One of the following: `string` (text box for free text entry), `boolean` (a check box), `multiple` (pop-up box with multiple choice options), `heading` (not actually an option, but serves as a heading in the prefs window) or `password` (password entry field). Passwords are stored in user's keychain instead of app preferences.|
|`label`|Localizable String|Required|The label to appear in the UI for this option.|
|`description`|Localizable String|Optional|A longer description to appear in the UI to explain this option.|
|`default value`|String|Optional|This field specifies the default value of the option. If omitted, `string` options default to the empty string, `boolean` options default to `true`, and `multiple` options default to the top item in the list. A `password` field may not have a default value.|
|`values`|Array|Required for `multiple` type|Array of strings representing the possible values for the multiple choice option.|
|`value labels`|Array|Optional|Array of "human friendly" strings corresponding to the multiple choice values. This is used only in the PopClip options UI, and is not passed to the script. If omitted, the option values themselves are shown.|
|`inset`|Boolean|Optional|If true, the option field will be shown inset to the right of the label, instead of under it. Default is false.|

## Using Scripts

### Script Fields

These strings are available in Shell Script and AppleScript extensions. Where no value is available, the field will be set to an empty string.

|Field Name|Shell Script Variable|AppleScript Placeholder|Description|
|----|---------------------|-----------------|-----------|
|`extension identifier`|`POPCLIP_EXTENSION_IDENTIFIER`|`{popclip extension identifier}`|This extension's identifier.|
|`action identifier`|`POPCLIP_ACTION_IDENTIFIER`|`{popclip action identifier}`|The identifier specified in the action's configuration, if any.|
|`text`|`POPCLIP_TEXT`|`{popclip text}`|The part of the selected plain text matching the specified regex or requirement.|
|`full text`|`POPCLIP_FULL_TEXT`|`{popclip full text}`|The selected plain text in its entirety.|
|`urlencoded text`|`POPCLIP_URLENCODED_TEXT`|`{popclip urlencoded text}`|URL-encoded form of the matched text.|
|`html`|`POPCLIP_HTML`|`{popclip html}`|Sanitized HTML for the selection. CSS is removed, potentially unsafe tags are removed and markup is corrected. (`Capture HTML` must be specified.)|
|`raw html`|`POPCLIP_RAW_HTML`|`{popclip raw html}`|The original unsanitized HTML, if available. (`Capture HTML` must be specified.)|
|`markdown`|`POPCLIP_MARKDOWN`|`{popclip markdown}`|A conversion of the HTML to Markdown. (`Capture HTML` must be specified.)|
|`urls`|`POPCLIP_URLS`|`{popclip urls}`|Newline-separated list of web URLs that PopClip detected in the selected text.|
|`modifier flags`|`POPCLIP_MODIFIER_FLAGS`|`{popclip modifier flags}`|Modifier flags for the keys held down when the extension's button was clicked in PopClip. Values are as defined in [Key Code format](#key-code-format). For example, `0` for no modifiers, or `131072` if shift is held down.|
|`bundle identifier`|`POPCLIP_BUNDLE_IDENTIFIER`|`{popclip bundle identifier}`|Bundle identifier of the app the text was selected in. For example, `com.apple.Safari`.|
|`app name`|`POPCLIP_APP_NAME`|`{popclip app name}`|Name of the app the text was selected in. For example, `Safari`.|
|`browser title`|`POPCLIP_BROWSER_TITLE`|`{popclip browser title}`|The title of the web page that the text was selected from. (Supported browsers only.)|
|`browser url`|`POPCLIP_BROWSER_URL`|`{popclip browser url}`|The URL of the web page that the text was selected from. (Supported browsers only.)|
|`option *`|`POPCLIP_OPTION_*` *(all UPPERCASE)*|`{popclip option *}` *(all lowercase)*|One such value is generated for each option specified in `Options`, where `*` represents the `Option Identifier`. For boolean options, the value with be a string, either `0` or `1`.|

### Indicating Errors

Scripts may indicate success or failure as follows:

|Result|JavaScript|Shell Script|AppleScript|
|------|------------|-----------|----------|
|Success|Complete without throwing error.|Exit code `0`|Complete without throwing error.|
|General error. (PopClip will show an "X".)|Throw any error. (Example: `throw new Error('message')`.)| Exit code `1`|Throw error with any code. (Example: `error "message" number 501`.)|
|Error with user's settings, or not signed in. (PopClip will show an "X" and pop up the extension's options UI.)|Throw error with specific message 'Not signed in'. (Example: `throw new Error('Not signed in')`.)| Exit code `2`|Throw error with code `502`. (Example: `error "message" number 502`.)|

## Field name mapping

Some field names were different in older versions of PopClip. Others have alternative allowable forms to avoid confusion when expressed camel case, e.g. `appleScriptFile` is mapped to `applescriptFile`.

PopClip applies the following mapping to field names loaded from the config file:

| Old/Alternative name      | Canonical name   |
| ------------------------- | ---------------- |
| image file                | icon             |
| required software version | popclip version  |
| pop clip version          | popclip version  |
| required os version       | macos version    |
| mac os version            | macos version    |
| pass html                 | capture html     |
| blocked apps              | excluded apps    |
| regular expression        | regex            |
| apple script              | applescript      |
| apple script file         | applescript file |
| apple script call         | applescript call |
| java script               | javascript       |
| java script file          | javascript file  |

Also, if the field name has the prefix `extension` or `option`, it is removed.
