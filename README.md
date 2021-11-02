# PopClip Extensions

This document applies to PopClip 2021.11 (3785). See also: [Changelog](CHANGELOG.md)

## Table of Contents

- [PopClip Extensions](#popclip-extensions)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
    - [License](#license)
    - [Credits](#credits)
    - [Contributing](#contributing)
    - [Useful Links](#useful-links)
    - [Extension Signing](#extension-signing)
    - [Extra Debugging Output](#extra-debugging-output)
  - [Anatomy of a PopClip Extension](#anatomy-of-a-popclip-extension)
    - [Types of Actions](#types-of-actions)
    - [Filtering](#filtering)
    - [About .popclipextz files](#about-popclipextz-files)
    - [The .popclipext package](#the-popclipext-package)
    - [The Config file](#the-config-file)
    - [Field names](#field-names)
  - [Icons](#icons)
    - [Text-based icons](#text-based-icons)
  - [The Config file structure](#the-config-file-structure)
    - [About the "Localizable String" type](#about-the-localizable-string-type)
  - [Extension properties](#extension-properties)
  - [Action properties](#action-properties)
    - [Common action properties](#common-action-properties)
    - [Shortcut action properties](#shortcut-action-properties)
    - [Service action properties](#service-action-properties)
    - [URL action properties](#url-action-properties)
    - [Key Press action properties](#key-press-action-properties)
    - [JavaScript action properties](#javascript-action-properties)
    - [AppleScript action properties](#applescript-action-properties)
    - [Shell Script action properties](#shell-script-action-properties)
  - [Meanings of particular fields](#meanings-of-particular-fields)
    - [The `requirements` array](#the-requirements-array)
    - [The `before` and `after` strings](#the-before-and-after-strings)
    - [The `app` dictionary](#the-app-dictionary)
    - [The `options` array](#the-options-array)
  - [Using Scripts](#using-scripts)
    - [Script Fields](#script-fields)
    - [Example AppleScript File](#example-applescript-file)
    - [Example Shell Script Files](#example-shell-script-files)
    - [Shell Script Testing](#shell-script-testing)
    - [Indicating Errors](#indicating-errors)
  - [Key Combo format](#key-combo-format)
    - [Key code string format](#key-code-string-format)
    - [Key code dictionary format](#key-code-dictionary-format)
  - [Field name mapping](#field-name-mapping)

## Introduction

PopClip Extensions add extra actions to [PopClip](http://pilotmoon.com/popclip).

![Screenshot showing extensions in use.](https://raw.github.com/pilotmoon/PopClip-Extensions/master/docs-assets/example.png)

This repository contains the documentation for making your own extensions (this readme file) as well as the source files for the extensions published on the main [PopClip Extensions](http://pilotmoon.com/popclip/extensions) page. Plus bonus extensions not published on that page.

### License

All extension source files are published under the MIT License (see [LICENSE.txt](/LICENSE.txt)) unless noted otherwise in the readme files of individual extensions.

### Credits

All the extensions and documentation were created by Nick Moore, except where stated. Individual extension credits are included in a readme file with the extension.

### Contributing

Thank you for contributing! New extensions can be contributed by pull request, as a new folder in the `source` folder of this repo. Alternatively simply by zip up your extension and email it to me. Contributors, please note the following:

- By contributing to this repo, you agree that your contribution may be published at [PopClip Extensions](https://pilotmoon.com/popclip/extensions/).
- Submitting to the repo does not guarantee publication on the website. (And if I don't publish your extension there it doesn't mean your extension is bad. I curate that list for the general audience and your extension just might be more technical or niche.)
- I may make changes to any extension submitted.
- Don't worry about signing the extension, I will take care of that.

### Useful Links

For an easy way to create certain types of extension with no coding necessary, check out Brett Terpstra's [PopMaker](http://brettterpstra.com/2014/05/12/popmaker-popclip-extension-generator/) app.

Here are some external "how to" guides for creating extensions:

- [Create Your Own Custom Extension for PopClip (Tuts+)](http://computers.tutsplus.com/tutorials/create-your-own-custom-extension-for-popclip--mac-50637)
- [PopClip: Scripting Extensions (Tuts+)](http://computers.tutsplus.com/tutorials/popclip-scripting-extensions--mac-55842)

### Extension Signing

By default, PopClip will display a warning dialog when you try to install your own extension, because it is not digitally signed.

![Example unsigned warning.](https://raw.github.com/pilotmoon/PopClip-Extensions/master/docs-assets/ext_warning.png)

If you find this gets annoying while you are testing your work, you can turn off the warning. Run the following command at the Terminal, then Quit and restart PopClip:

    defaults write com.pilotmoon.popclip LoadUnsignedExtensions -bool YES

Please be aware that PopClip extensions can contain arbitrary executable code. Be careful about the extensions you create, and be wary about loading extensions you get from someone else.

### Extra Debugging Output

To help you when debugging Script extensions, PopClip can be configured to write script output and debug info to be viewed with the Console app. To enable it, run this command in Terminal:

    defaults write com.pilotmoon.popclip EnableExtensionDebug -bool YES

## Anatomy of a PopClip Extension

***A note on "module-based" extensions:** PopClip 2021.11 supports a new kind of extension that I am calling a module-based extension. In a module-based extension, the extension itself is defined by a JavaScript module. This allows greater flexibility and customization of the extension, at the cost of being more complex to explain and to use. This document focuses on "classic" extensions, and not module based extensions. Documentation for module-based extensions is still being prepared.*

### Types of Actions

There are seven kinds of actions supported by PopClip extensions.

| Action Type | Description | Example |
|------|-------------|---------|
|Shortcut|Send the selected text to a macOS Shortcut. (Requires on macOS 12.0 Monterey.)| - |
|Service|Send the selected text to a macOS Service.| [MakeSticky](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/MakeSticky)|
|URL|Open a URL, with the selected text URL-encoded and inserted.|[GoogleTranslate](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/GoogleTranslate)|
|Key Press|Press a key combination.| [Delete](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/Delete)|
|JavaScript|Run a JavaScript script.|-|
|AppleScript|Run an AppleScript script.|[BBEdit](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/BBEdit)|
|Shell Script|Run a shell script.| [Say](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/Say)

### Filtering

Extensions have access to the following filtering mechanisms, to help prevent actions appearing when they are not useful:

- Filter by matching a regular expression.
- Filter by application (either include or exclude).
- Filter by whether cut, copy or paste is available.
- Filter by whether the text contains a URL, email address or file path.
- Filter by the current value of the extensions's options.

### About .popclipextz files

For distribution on the [PopClip Extensions](http://pilotmoon.com/popclip/extensions) page, extensions are zipped and renamed with the extension `.popclipextz`. You can examine an existing PopClip extension by renaming it with a `.zip` extension and unzipping it, to reveal a `.popclipext` package.

### The .popclipext package

A PopClip extension consists of a configuration file called either `Config.json`, `Config.yaml` or `Config.plist`, plus (optional) additional files such as icons and scripts, all contained in a directory whose name ends with `.popclipext`. Such a directory will be treated as a package by Mac OS X. To view the contents of a package, right click it in Finder and choose 'Show Package Contents'.

If you double-click a `.popclipext` package, PopClip will attempt to load and install it. PopClip stores its installed extensions in `~/Library/Application Support/PopClip/Extensions/`.

Here is an example package structure, using the 'Say' extension:

    Say.popclipext                  -- Containing folder
       _Signature.plist             -- Signature (official Pilotmoon extensions only)
       Config.plist                 -- Main configuration file
       say.sh                       -- Script file
       speechicon.png               -- Icon file

### The Config file

Every extension must contain a Config file, in either JSON, YAML or plist format.

| Format | File Name      | Description                                                                |
| ------ | -------------- | -------------------------------------------------------------------------- |
| JSON   | `Config.json`  | A file in [JSON](https://www.json.org/json-en.html) format.                |
| YAML   | `Config.yaml`  | A file in [YAML 1.2](https://yaml.org) format.                             |
| plist  | `Config.plist` | An Apple [XML Property List](https://en.wikipedia.org/wiki/Property_list). |

The Config file must define a single dictionary at its root, which defines the extension. Although the three formats are different, they all can be used to define a dictionary mapping
string keys to values. The values can be strings, numbers, booleans, arrays or other dictionaries. (In this documentation the term 'field' is used to refer to a key/value pair in a dictionary.)

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

- **As a filename:** `<filename>.png` or `<filename>.svg` specifies an image file within the extension package, in either PNG or SVG format. You can create your own with an image editor, or you could use icons from a website like [The Noun Project](https://thenounproject.com)] or the macOS app [IconJar](https://geticonjar.com/resources/). Please include any applicable copyright attribution in a README file.

- **As an SF Symbol:** `symbol:<symbol name>` specifies an [SF Symbols](https://sfsymbols.com) identifier, for example `symbol:flame`. Symbols are only available on macOS 11.0 and above. Also note that some symbols require higher macOS versions as indicated in the "Availability" panel in Apple's SF Symbols browser app. (If the symbol does not exist on the version of macOS the user is running, it will be as if no icon was specified. Therefore, you should specify an appropriate `macos version` when using a symbol icon.)

- **As a text-based icon:** Using a special format, you can instruct PopClip to generate a text-based icon (see below)

PNG and SVG icons should be square and monochrome. The image should be black, on a transparent background. You can use opacity to create shading. PNG icons should be at least 256x256 pixels in size.

### Text-based icons

Text-based icons can up to three characters, on their own or within an enclosing shape. They are specified by space separated keywords followed by the characters to draw.

The following keywords define an enclosing shape (only one of these should be included):

| Keyword      | Effect                                                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `text`       | Draw the text on its own, without a shape. This is the default if no shape keyword is specified.                                |
| `square`     | Encloses text in round cornered square.                                                                                         |
| `circle`     | Encloses text in a circle.                                                                                                      |
| `search`     | Encloses text in a magnifying glass shape.                                                                                      |

The following keywords modify the way the text is drawn:

| Keyword      | Effect                                                                                                                                                   |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `filled`     | Specifies a solid filled shape (default is an outline shape).                                                                                            |
| `monospaced` | Specifies that the text be drawn in a monospaced font (default is variable-width font). Punctuation characters often render better in a monospaced font. |

Examples:

| Example                       | Icon Generated                                                                                                                       |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `A` or `text A`               | <img src="https://raw.githubusercontent.com/pilotmoon/PopClip-Extensions/master/docs-assets/texticons/A.png" width="20" height="20">     |
| `circle 1`                    | <img src="https://raw.githubusercontent.com/pilotmoon/PopClip-Extensions/master/docs-assets/texticons/circle_1.png" width="20" height="20">   |
| `circle filled 本`             | <img src="https://raw.githubusercontent.com/pilotmoon/PopClip-Extensions/master/docs-assets/texticons/circle_filled_本.png" width="20" height="20"> |
| `square xyz`                  | <img src="https://raw.githubusercontent.com/pilotmoon/PopClip-Extensions/master/docs-assets/texticons/square_xyz.png" width="20" height="20"> |
| `square filled !`             | <img src="https://raw.githubusercontent.com/pilotmoon/PopClip-Extensions/master/docs-assets/texticons/square_filled_!.png" width="20" height="20"> |
| `square filled monospaced ()` | <img src="https://raw.githubusercontent.com/pilotmoon/PopClip-Extensions/master/docs-assets/texticons/square_filled_monospaced_().png" width="20" height="20"> |
| `search E`                    | <img src="https://raw.githubusercontent.com/pilotmoon/PopClip-Extensions/master/docs-assets/texticons/search_E.png" width="20" height="20">   |
| `search filled £`             | <img src="https://raw.githubusercontent.com/pilotmoon/PopClip-Extensions/master/docs-assets/texticons/search_filled-£.png" width="20" height="20">|

## The Config file structure

### About the "Localizable String" type

Fields shown as "Localizable String" may be either a string or a dictionary. If you supply a string, that string is always used. If you supply a dictionary mapping language codes (`en`, `fr`, `zh-hans`, etc.) to a string, PopClip will display the string for the user's preferred language if possible, with fallback to the `en` string.

## Extension properties

Thg following fields are used at the top level of the configuration to define properties of the extension itself. All fields are optional.

|Key|Type|Description|
|---|----|-----------|
|`name` |Localizable String| This is a display name that appears in the preferences list of extensions. If omitted, a name is generated automatically from the `.popclipext` package name.|
|`icon` |String|See [Icons](#icons). If you omit this field, the icon for the first action will be used (if any), or else no icon will be displayed. |
|`identifier` |String| You may provide an identifier string here to uniquely identify this extension. Use your own prefix, which could be a reverse DNS-style prefix based on a domain name you control `com.example.myextension`. (Do not use the prefix `com.pilotmoon.` for your own extensions.)If you omit this field, PopClip will identify the extension by its package name (e.g. `Name.popclipext`) instead.|
|`description`|Localizable String|A short, human readable description of this extension. Appears on the web site but not in the app.|
|`macos version` |String|Minimum version number of Mac OS X needed by this extension. For example `10.8.2` or `11.0`.|
|`popclip version` |Integer|Minimum PopClip version required. This is the build number, as shown in brackets in the about pane. You should specify `3785` for new extensions based on this document.|
|`options`|Array|Array of dictionaries defining the options for this extension, if any. See [The `options` array](#the-options-array).|
|`options title`|Localizable String|Title to appear at the top of the options window. Default is `Options for <extension name>`.|
|`action`|Dictionary|A dictionary defining a single action for this extension.|
|`actions`|Array|Array of dictionaries defining the actions for this extension.|

If neither `actions` nor `action` is defined, PopClip will look at the top level of the plist for an action definition.

## Action properties

### Common action properties

The following fields define properties common to all actions. All fields are optional.

|Key|Type|Required?|Description|
|---|----|---------|-----------|
|`title`|Localizable String|The title is displayed on the action button if there is no icon. For extensions with icons, the title is displayed in the tooltip. If omitted, the action will take the extension name as its title.|
|`icon`|String| The icon to show on the action button. See [Icons](#icons) for the icon specification format. To explicitly specify no icon, set this field either to boolean `false` (in a plist) or to `null` (in JSON/YAML).|
|`identifier`|String|A string to identify this action. In shell script and AppleScript actions, the identifier is passed to the script.|
|`requirements`|Array|Array consisting of zero or more of the strings listed in [the `requirements` array](#the-requirements-array). All the requirements in the array must be satisfied. If the array is omitted, the requirement `copy` is applied by default.|
|`before`|String|String to indicate an action PopClip should take *before* performing the main action. See [Before and After](#the-before-and-after-strings).|
|`after`|String|String to indicate an action PopClip should take *after* performing the main action. See [The `before` and `after` strings](#the-before-and-after-strings).
|`excluded apps`|Array|Array of bundle identifiers of applications. The action will not appear when PopClip is being used in any of the the specified apps.|
|`required apps`|Array|Array of bundle identifiers of applications. The action will only appear when PopClip is being used in one of the specified apps. *Note: This field does not make PopClip do a check to see if the app is present on the computer. For that, use the `App` field.*|
|`regex`|String|A [Regular Expression](http://regularexpressions.info/) to be applied to the selected text. The action will appear only if the text matches the regex, and the matching part of the text is passed to the action. The regex engine used is Cocoa's `NSRegularExpression`, which uses the [ICU specification](https://unicode-org.github.io/icu/userguide/strings/regexp.html) for regular expressions. _Note: There is no need to use your own regex to match URLs, email addresses or file paths. Use one of the `requirements` keys `url`, `urls`, `email`, `emails` or `path` instead. Also be careful to avoid badly crafted regexes which never terminate against certain inputs._|
|`app`|Dictionary|Information about the app or website associated with this action. You can use this field to, optionally, specify that a certain app must be present on the system for the action to work. See [The `app` dictionary](#the-app-dictionary).|
|`stay visible`|Boolean|If `true`, the PopClip popup will not disappear after the user clicks the action. (An example is the Formatting extension.) Default is `false`.|
|`capture html`|Boolean|If `true`, PopClip will attempt to capture HTML and Markdown for the selection. PopClip makes its best attempt to extract HTML, first of all from the selection's HTML source itself, if available. Failing that, it will convert any RTF text to HTML. And failing that, it will generate an HTML version of the plain text. It will then generate Markdown from the final HTML. Default is `false`.|

### Shortcut action properties

A shortcut action is defined by the presence of a `shortcut name` field. Shortcut actions are only available on macOS 12.0 and above.

|Key|Type|Description|
|---|----|-----------|
|`shortcut name`|String|The name of the macOS Shortcut to call. The name is whatever it is called in the Shortcuts app.|

The selected text will be sent as input to the service, and any text returned by the shortcut will be available to the `after` action.

### Service action properties

A service action is defined by the presence of a `service name` field.

|Key|Type|Description|
|---|----|-----------|
|`service name`|String|The name of the macOS service to call. The name is as shown in the Services menu, for example `Add to Deliveries`.|

In some cases, you may need to look into the Info.plist of the application to find the name defined in there under `NSServices` → `NSMenuItem`. An example of this is the `Make New Sticky Note` service which must be called as `Make Sticky`.

### URL action properties

An URL action is defined by the presence of a `url` field.

|Key|Type|Description|
|---|----|-----------|
|`url`|String|The URL to open when the user clicks the action. Use `{popclip text}` as placeholder for the selected text. The inserted string will be automatically URL-encoded by PopClip. |

You can also put options in the URL, in the same format as for AppleScripts. For example, `http://translate.google.com/#auto%7C{popclip option language}%7C{popclip text}`.

The string `***` will also work as a shorthand for `{popclip text}`.

You can open any type of URL, not just web URLs. PopClip will try to open URLs in the most appropriate application given the user's current context.

Note that if using a `Config.plist`, any `&` characters in the URL must be XML-encoded as `&amp;`.

### Key Press action properties

A Key Press action is defined by the presence of a `key combo` field.

|Key|Type|Description|
|---|----|-----------|
|`key combo`|String or Dictionary|The key combination that PopClip should press. See [Key Combo format](#key-combo-format).|

The key press is delivered at the current app level, not at the OS level. This means PopClip is not able to trigger global keyboard shortcuts. So for example PopClip can trigger ⌘B for "bold" (if the app supports that) but not ⌘Tab for "switch app".

### JavaScript action properties

TODO

### AppleScript action properties

An AppleScript action is defined by the presence of either an `applescript file` field or and `applescript` field, as follows.

|Key|Type|Description|
|---|----|-----------|
|`applescript file`|String|The name of the AppleScript file to run, for example `my_script.applescript`. The file must exist in the extension's package directory and must be a plain text file. (Save files as `.applescript`, not `.scpt` — **.scpt is a different file format and will not work!**) |
|`applescript`|String|A text string to run as an AppleScript. For example: `tell application "LaunchBar" to set selection to "{popclip text}"`.|

Within the AppleScript, use `"{popclip text}"` as the placeholder for the selected text. PopClip will replace the placeholders with the actual text before executing the script. Other fields are also available: see [Script Fields](#script-fields).

You can return a value from the script and have PopClip act upon it by defining an `after` key. See also [Example AppleScript File](#example-applescript-file).

### Shell Script action properties

An Shell Script action is defined by the presence of a `shell script file` field, with an optional `script interpreter` field.

|Key|Type|Description|
|---|----|-----|
|`shell script file`|String (required)|The name of the shell script file to invoke. The file must exist in the extension's package. By default, the script is executed using `/bin/sh`. To use other scripting runtimes, you may define a `script interpreter`.|
|`script interpreter`|String (optional)|Specify the interpreter to use for `Shell Script File`. The default is `/bin/sh`. You can either specify an absolute path (starting with `/`) such as `/usr/bin/ruby`, or an executable name on its own such as `ruby`. PopClip will look for the named executable in the `PATH` of the user's default shell.|

The the current working directory will be set to the package directory. Within the script, access the selected text as `$POPCLIP_TEXT`, and other variables as described in [Script Fields](#script-fields). You can return a value from the script and have PopClip act upon it by defining an `after` key. See [Example Shell Script File](#example-shell-script-file).

## Meanings of particular fields

### The `requirements` array

These are the values supported by the `requirements` array. Additionally, you can prefix any requirement with `!` to negate it.

|Value|Description|
|-----|-----------|
|`copy`|One or more characters of text must be selected. (The app's Copy command does not necessarily have to be available. It did in older versions of PopClip, hence the name.)
|`cut`|Text must be selected and the app's Cut command must be available.|
|`paste`|The app's Paste command must be available.|
|`url`|The text must contain exactly one web URL (http or https).|
|`urls`|The text must contain one or more web URLs (https or https).|
|`email`|The text must contain exactly one email address.|
|`path`|The text must be a local file path, and it must exist on the local file system.|
|`formatting`|The selected text control must support formatting. (PopClip makes its best guess about this, erring on the side of a false positive.)|
|`option-*=#`|The option named `*` must be equal to the string `#`. For example `option-fish=shark` would require an option named `fish` to be set to the value `shark`. This mechanism allows actions to be enabled and disabled via options.|

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
|`popclip-appear`|Trigger PopClip to appear again with the current selection. (This is used by the Select All extension.)|
|`copy-selection`|Place the original selected text to the clipboard. (This is used by the Swap extension.)|

### The `app` dictionary

The `app` field is a dictionary with the following stricture:

|Key|Type|Required?|Description|
|---|----|---------|-----------|
|`name`|String|Required|Name of the app which this extension interacts with. For example `Evernote` for an Evernote extension.|
|`link`|String|Required|Link to a website where the user can get the app referred to in `Name`. For example `https://evernote.com/`.|
|`check installed`|Boolean|If `true`, PopClip will check whether an app with one of the given `Bundle Identifiers` is installed when the user tries to use the extension. None is found, PopClip will show a message and a link to the website given in `Link`. Default is `false`.|
|`bundle identifiers`|Array|Required if `check installed` is `true`|Array of bundle identifiers for this app, including all application variants that work with this extension. In the simplest case there may be just one bundle ID. An app may have alternative bundle IDs for free/pro variants, an App Store version, a stand-alone version, a Setapp version, and so on. Include all the possible bundle IDs that the user might encounter.|

### The `options` array

Options are presented to the user in a preferences user interface window and are saved in PopClip's preferences on behalf of the extension. Options appear in the UI in the order they appear in the `options` array. An option dictionary has the following structure.

|Key|Type|Required?|Description|
|---|----|---------|-----------|
|`identifier`|String|Required|Identifying string for this option. This is passed to your script. The identifier will be downcased or upcased for AppleScript and Shell Script targets, respectively — see [Script Fields](#script-fields).|
|`type`|String|Required|One of the following: `string` (text box for free text entry), `boolean` (a check box), `multiple` (pop-up box with multiple choice options) or `password` (password entry field). Passwords are stored in user's keychain instead of app preferences.|
|`label`|Localizable String|Required|The label to appear in the UI for this option.|
|`description`|Localizable String|A longer description to appear in the UI to explain this option.|
|`default value`|String|This field specifies the default value of the option. If omitted, `string` options default to the empty string, `boolean` options default to `true`, and `multiple` options default to the top item in the list. A `password` field may not have a default value.|
|`values`|Array|Required for `multiple` type|Array of strings representing the possible values for the multiple choice option.|
|`value labels`|Array|Array of "human friendly" strings corresponding to the multiple choice values. This is used only in the PopClip options UI, and is not passed to the script. If omitted, the option values themselves are shown.|
|`inset`|Boolean|If true, the option field will be shown inset to the right of the label, instead of under it. Default is false.|

## Using Scripts

### Script Fields

These strings are available in Shell Script and AppleScript extensions. Where no value is available, the field will be set to an empty string.

|Shell Script Variable|AppleScript Field|Description|
|---------------------|-----------------|-----------|
|`POPCLIP_EXTENSION_IDENTIFIER`|`{popclip extension identifier}`|This extension's identifier.|
|`POPCLIP_ACTION_IDENTIFIER`|`{popclip action identifier}`|The identifier specified in the action's configuration, if any.|
|`POPCLIP_TEXT`|`{popclip text}`|The part of the selected plain text matching the specified regex or requirement.|
|`POPCLIP_FULL_TEXT`|`{popclip full text}`|The selected plain text in its entirety.|
|`POPCLIP_URLENCODED_TEXT`|`{popclip urlencoded text}`|URL-encoded form of the matched text.|
|`POPCLIP_HTML`|`{popclip html}`|Sanitized HTML for the selection. CSS is removed, potentially unsafe tags are removed and markup is corrected. (`Capture HTML` must be specified.)|
|`POPCLIP_RAW_HTML`|`{popclip raw html}`|The original unsanitized HTML, if available. (`Capture HTML` must be specified.)|
|`POPCLIP_MARKDOWN`|`{popclip markdown}`|A conversion of the HTML to Markdown. (`Capture HTML` must be specified.)|
|`POPCLIP_URLS`|`{popclip urls}`|Newline-separated list of web URLs that PopClip detected in the selected text.|
|`POPCLIP_MODIFIER_FLAGS`|`{popclip modifier flags}`|Modifier flags for the keys held down when the extension's button was clicked in PopClip. Values are as defined in [Key Code format](#key-code-format). For example, `0` for no modifiers, or `131072` if shift is held down.|
|`POPCLIP_BUNDLE_IDENTIFIER`|`{popclip bundle identifier}`|Bundle identifier of the app the text was selected in. For example, `com.apple.Safari`.|
|`POPCLIP_APP_NAME`|`{popclip app name}`|Name of the app the text was selected in. For example, `Safari`.|
|`POPCLIP_BROWSER_TITLE`|`{popclip browser title}`|The title of the web page that the text was selected from. (Supported browsers only.)|
|`POPCLIP_BROWSER_URL`|`{popclip browser url}`|The URL of the web page that the text was selected from. (Supported browsers only.)|
|`POPCLIP_OPTION_*` *(all UPPERCASE)*|`{popclip option *}` *(all lowercase)*|One such value is generated for each option specified in `Options`, where `*` represents the `Option Identifier`. For boolean options, the value with be a string, either `0` or `1`.|

### Example AppleScript File

**Important: AppleScript files must be in plain text format. Save as .applescript, not .scpt.**

Here is an example of an AppleScript file (this one is for the 'TextEdit' extension):

```applescript
tell application "TextEdit"
 activate
 set theDocument to make new document
 set text of theDocument to "{popclip text}"
end tell
```

### Example Shell Script Files

Here is an example of an extension shell script (this one is for 'Say'):

``` sh
#!/bin/sh
echo $POPCLIP_TEXT | say  # pipe text to 'say' command
```

A shell script can return a string back to PopClip via to stdout. For example:

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

### Shell Script Testing

While developing a script, you can test it from the command line by exporting the required variables. For example:

    export POPCLIP_TEXT="my test text"
    export POPCLIP_OPTION_FOO="foo"
    ./myscript

### Indicating Errors

Scripts may indicate success or failure as follows:

|Result|JavaScript|Shell Script|AppleScript|
|------|------------|-----------|----------|
|Success|Complete without throwing error.|Exit code `0`|Complete throwing raising error.|
|General error. (PopClip will show an "X".)|Throw any error. (Example: `throw new Error('message')`.)| Exit code `1`|Throw error with code `501`. (Example: `error "message" number 501`.)|
|Error with user's settings, or not signed in. (PopClip will show an "X" and pop up the extension's options UI.)|Throw error with specific message 'Not signed in'. (Example: `throw new Error('Not signed in')`.)| Exit code `2`|Throw error with code `502`. (Example: `error "message" number 502`.)|

## Key Combo format

Key presses may be expressed in either of two ways.

### Key code string format

The string format is a convenient human-readable format that can specify a key character and modifiers. It is simply a space-separated list of one or more modifiers (order does not matter), followed by a single character to press.

For example: `option shift .` or `command B`

The key code string is not case sensitive. (Key character will automatically be converted to uppercase).

The modifiers are specified with the following keywords:

| Modifier    | Keyword             |
| ----------- | ------------------- |
| Command (⌘) | `command` or `cmd`  |
| Option (⌥)  | `option` or `opt`   |
| Control (⌃) | `control` or `ctrl` |
| Shift (⇧)   | `shift`             |

### Key code dictionary format

The dictionary format is also able to specify modifiers plus a key character or key code.

|Key|Type|Required?|Description|
|---|----|------|----|
|`key char`|String|(see note below) |Character key to press. For example `A`. Letter keys should be given ing upper case.|
|`key code`|Number|(see note below) |Virtual key code for key to press. For example, the delete key is `51`. For help finding the code see [this StackOverflow question](http://stackoverflow.com/questions/3202629/where-can-i-find-a-list-of-mac-virtual-key-codes).|
|`modifiers`|Number|Required|Bit mask for modifiers to press. Use `0` for no modifiers. Shift=`131072`, Control=`262144`, Option=`524288`, Command=`1048576`. Add together the values to specify multiple modifiers (see table below).

Note: Exactly one of `keyChar` or `keyCode` should be specified. Not both.

Table of modifier combinations:

|Keys|Value|
|----|-----|
|none|0|
|⇧|131072|
|⌃|262144|
|⌃⇧|393216|
|⌥|524288|
|⌥⇧|655360|
|⌃⌥|786432|
|⌃⌥⇧|917504|
|⌘|1048576|
|⇧⌘|1179648|
|⌃⌘|1310720|
|⌃⇧⌘|1441792|
|⌥⌘|1572864|
|⌥⇧⌘|1703936|
|⌃⌥⌘|1835008|
|⌃⌥⇧⌘|1966080|

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
| apple script file         | applescript file |
| apple script              | applescript      |
| java script file          | javascript file  |
| java script               | javascript       |

Also, if the field name has the prefix `extension` or `option`, it is removed.
