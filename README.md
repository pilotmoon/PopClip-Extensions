# PopClip Extensions

This document applies to PopClip 2021.10 (3543). See also: [Changelog](CHANGELOG.md)

Entries marked **BETA** apply to the current [PopClip beta](https://pilotmoon.com/popclip/download).

<!-- ([Draft JavaScript extensions documentation](https://pilotmoon.github.io/PopClip-Extensions/)) -->

## Introduction

PopClip extensions add extra actions to [PopClip](http://pilotmoon.com/popclip). 

![Screenshot showing extensions in use.](https://raw.github.com/pilotmoon/PopClip-Extensions/master/docs-assets/example.png)

This repository contains the documentation for making your own extensions (this readme file) as well as the source files for the extensions published on the main [PopClip Extensions](http://pilotmoon.com/popclip/extensions) page. Plus bonus extensions not published on that page.

## License

All extension source files are published under the MIT License (see LICENSE) unless noted otherwise in the readme files of individual extensions.

## Credits

All the extensions and documentation were created by Nick Moore, except where stated. Contributor credits may be included in a readme file with each individual extension.

## Contributing

Thank you for contributing! New extensions can be contributed by pull request, as a new folder in the `source` folder of this repo. Alternatively simply by zip up your extension and email it to me. Contributors, please note the following:

* By contributing to this repo, you agree that your contribution may be published at [PopClip Extensions](https://pilotmoon.com/popclip/extensions/).
* Submitting to the repo does not guarantee publication on the website. (And if I don't publish your extension there it doesn't mean your extension is bad. I curate that list for the general audience and your extension just might be more technical or niche.)
* I may make changes to any extension submitted.
* Don't worry about signing the extension, I will take care of that.

Also I'm aware that there is a years-old list of unmerged pull requests and I'm sorry about that. I'm trying to make sure to merge any new ones as they come in. Again, it's not a reflection on the quality of your submission, it's just that there is only one of me. Please ping me if I've ignored something and you'd like me to take a look.

## Useful Links

For an easy way to create certain types of extension with no coding necessary, check out Brett Terpstra's [PopMaker](http://brettterpstra.com/2014/05/12/popmaker-popclip-extension-generator/) app.

Here are some external "how to" guides for creating extensions:

- [Create Your Own Custom Extension for PopClip (Tuts+)](http://computers.tutsplus.com/tutorials/create-your-own-custom-extension-for-popclip--mac-50637)
- [PopClip: Scripting Extensions (Tuts+)](http://computers.tutsplus.com/tutorials/popclip-scripting-extensions--mac-55842)

## Extension Signing

By default, PopClip will display a warning dialog when you try to install your own extension, because it is not digitally signed.

![Example unsigned warning.](https://raw.github.com/pilotmoon/PopClip-Extensions/master/docs-assets/ext_warning.png)

If you find this gets annoying while you are testing your work, you can turn off the warning. Run the following command at the Terminal, then Quit and restart PopClip:

    defaults write com.pilotmoon.popclip LoadUnsignedExtensions -bool YES

Please be aware that PopClip extensions can contain arbitrary executable code. Be careful about the extensions you create, and be wary about loading extensions you get from someone else.

## Extra Debugging Output

To help you when debugging Script extensions, PopClip can be configured to write script output and debug info to be viewed with the Console app. To enable it, run this command in Terminal:

    defaults write com.pilotmoon.popclip EnableExtensionDebug -bool YES

## General Overview

### Types of Actions

There are five kinds of actions supported by PopClip extensions.

| Action Type | Description | Example |
|------|-------------|---------|
|Service|Invoke a Mac OS X Service, passing the selected text.| [MakeSticky](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/MakeSticky)| 
|AppleScript|Run an AppleScript, with the selected text embedded.|[BBEdit](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/BBEdit)|
|Shell Script|Run a shell script, with the selected text passed as a shell variable.| [Say](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/Say)
|URL|Open an HTTP URL, with the selected text URL-encoded and inserted.|[GoogleTranslate](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/GoogleTranslate)|
|Keypress|Press a key combination.| [Delete](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/Delete)|


### Filtering
All extensions have access to the following filtering mechanisms, to help prevent them appearing when they are not useful:

* Filter by matching a regular expression.
* Filter by application (either include or exclude).
* Filter by whether cut, copy or paste is available.
* Filter by whether the text contains a URL, email address or file path.

## Anatomy of a PopClip Extension

### About .popclipextz files
For distribution on the [PopClip Extensions](http://pilotmoon.com/popclip/extensions) page, extensions are zipped and renamed with the extension `.popclipextz`. You can examine an existing PopClip extension by renaming it with a `.zip` extension and unzipping it, to reveal a `.popclipext` package.

### The .popclipext package
A PopClip extension consists of a property list called `Config.plist`, plus (optional) additional files such as the icon and any required scripts, all contained in a directory whose name ends with `.popclipext`. Such a directory will be treated as a package by Mac OS X. To view the contents of a package, right click it in Finder and choose 'Show Package Contents'.

If you double-click a `.popclipext` package, PopClip will attempt to load and install it. PopClip stores its installed extensions in `~/Library/Application Support/PopClip/Extensions/`. 

Here is an example package structure, using the 'Say' extension:

    Say.popclipext                  -- Containing folder
       _Signature.plist             -- Signature (official Pilotmoon extensions only)
       Config.plist                 -- Main configuration file
       say.sh                       -- Script file
       speechicon.png               -- Icon file

### The Config.plist
Every extension must contain a `Config.plist` file. This should be a text file in Apple [Property List](https://en.wikipedia.org/wiki/Property_list) format. The plist contains information about the extension, and also defines one or more *actions*. You can edit plist files with a standard text editor, with Xcode, or with a dedicated plist editor such as [PlistEdit Pro](http://www.fatcatsoftware.com/plisteditpro/).

Example plist: [ExampleConfig.plist](https://raw.github.com/pilotmoon/PopClip-Extensions/master/docs-assets/ExampleConfig.plist).

Here is an example plist for 'Translate Tab', as viewed in Xcode:

![Example plist, for 'Translate Tab'.](https://raw.github.com/pilotmoon/PopClip-Extensions/master/docs-assets/ttplist.png)

## Icons
Icons may be specified in the `Icon` and/or `Extension Icon` fields in a few different ways:

* **As a filename:** `<filename>.png` or `<filename>.svg` specifies an image file within the extension package, in either PNG or SVG format. You can create your own with an image editor, or you could use icons from a website like [The Noun Project](https://thenounproject.com)] or the macOS app [IconJar](https://geticonjar.com/resources/). Please include any applicable copyright attribution in a README file.

* **As an SF Symbol:** `symbol:<symbol name>` specifies an [SF Symbols](https://sfsymbols.com) name, for example `symbol:flame`. Symbols are only available on macOS 11.0 and above. Also note that some symbols require higher macOS versions as indicated in the "Availability" panel in Apple's SF Symbols browser app. (If the symbol does not exist on the version of macOS the user is running, it will be as if no icon was specified, and the extension will display the text title instead. You should probably specify an appropriate `Required OS Version` of when using a symbol icon.)

* **As SVG source code:** `svg:<svg code>` let you specify an image file as svg source code directly in the field. (Although in most cases it's probably a better idea to simply use a separate SVG file.)

* **As a text-based icon:** Using a special format, you can instruct PopClip to generate a text-based icon (see below).

PNG and SVG icons should be square and monochrome. The image should be black, on a transparent background. You can use opacity to create shading. PNG icons should be at least 256x256 pixels in size. 

### Text-based icons

Text-based icons can up to three characters, on their own or within an enclosing shape. The text is rendered in SF Pro, the macOS default UI font. The enclosing shape is specified using different kinds of brackets around the text, as follows (where `T` represents any 1 to 3 characters):

| Style            | Format       | Example | Result                                                                                                                                   |
| ---------------- | ------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| No decoration    | `T` or `-T-` | `A`     | <img src="https://raw.githubusercontent.com/pilotmoon/PopClip-Extensions/master/docs-assets/texticons/A.png" width="20" height="20">     |
| Circle (outline) | `(T)`        | `(2)`   | <img src="https://raw.githubusercontent.com/pilotmoon/PopClip-Extensions/master/docs-assets/texticons/(1).png" width="20" height="20">   |
| Circle (filled)  | `((T))`      | `((本))` | <img src="https://raw.githubusercontent.com/pilotmoon/PopClip-Extensions/master/docs-assets/texticons/((本)).png" width="20" height="20"> |
| Square (outline) | `[T]`        | `[xyz]` | <img src="https://raw.githubusercontent.com/pilotmoon/PopClip-Extensions/master/docs-assets/texticons/[xyz].png" width="20" height="20"> |
| Square (filled)  | `[[T]]`      | `[[!]]` | <img src="https://raw.githubusercontent.com/pilotmoon/PopClip-Extensions/master/docs-assets/texticons/[[!]].png" width="20" height="20"> |
| **BETA** Search (outline) | `{T}`        | `[Ex]` |  |
| **BETA** Search (filled)  | `{{T}}`      | `[[?]]` |  |

The text specifier also be used with the prefix `text:`, e.g. `text:[X]`.

## Config.plist Structure

#### General 
* All key names are case sensitive.
* Make sure that you set each field the correct type. A common error is to enter a number as a string type.

#### "String or Dictionary" type

Fields shown as "String or Dictionary" type are localizable strings. The field may be either a string or dictionary. If you supply a string, that string is always used. If you supply a dictionary mapping language codes (`en`, `fr`, `zh-Hans`, etc.) to a string. PopClip will display the string for the user's preferred language if possible, with fallback to the `en` string.

#### Plist Troubleshooting

Common reasons for malformed XML are:

* Missing end tags
* Mismatched start and end tags
* Unescaped `&` characters (`&` must be encoded as `&amp;`)

### Extension Properties

Thge following fields are used at the top level of the configuration to define properties of the extension itself.

|Key|Type|Required?|Description|
|---|----|---------|-----------|
|`Extension Name` _(**BETA:** `Name`)_|String or Dictionary| Required (_**BETA**: Optional_) | This is a display name that appears in the preferences list of extensions. (_**BETA**: If omitted, a name is generated automatically from the .popclipext package name.)|
|`Extension Icon` _(**BETA:** `Icon`)_|String|Optional|See [Icons](#icons). If you omit this field, the icon for the first action will be used (if any), or else no icon will be displayed. |
|`Extension Identifier` _(**BETA:** `Identifier`)_|String| Required (_**BETA**: Optional_) |You must (_**BETA**: may_) provide an identifier string here to uniquely identify this extension. Use your own prefix, which could be a reverse DNS-style prefix based on a domain name you control `com.example.myextension`. (Do not use the prefix `com.pilotmoon.` for your own extensions.) _**BETA:** If you omit this field, PopClip will identify the extension by its package name (e.g. `Name.popclipext`) instead._|
|`Extension Description`|String or Dictionary|Optional|A short, human readable description of this extension. Appears on the web site but not in the app.|
|`Required OS Version` _(**BETA:** `MacOS Version`)_|String|Optional|Minimum version number of Mac OS X needed by this extension. For example `10.8.2` or `11.0`.|
|`Required Software Version` _(**BETA:** `PopClip Version`)_|Integer|Optional|Minimum version number of PopClip needed by this extension. This is the numeric version as shown in brackes in PopClip's about pane. I recommend using `3543` for new extensions based on this document.|
|`Options`|Array|Optional|Array of dictionaries defining the options for this extension, if any. See [Option Dictionary](#option-dictionary).|
|`Options Title`|String or Dictionary|Optional|Title to appear at the top of the options window. Default is `Options for <extension name>`.|
|`Actions`|Array|Optional|Array of dictionaries defining the actions for this extension. See [Action Dictionary](#action-dictionary).|

**BETA**: If neither `Actions` not `Action` is defined, PopClip will look at the top level of the plist for an action definition.

### Action Type Definition

The action type is specified by including of *one* of the following five fields. This can be done _(**BETA** at the top level of the configuration, or within an `Action` dictionary or)_ within the `Actions` dictionary.

|Key|Type|Required?|Description|
|---|----|---------|-----------|
|`Service Name`|String|Required for Service actions|Exact name of the OS X service to call. This is usually the name as shown in the Services menu, for example `Add to Deliveries`.[^1]|
|`AppleScript File`|String|Required for AppleScript actions|The name of the AppleScript file to use. The file must exist in the extension's package. The script must be a plain text file (save as `.applescript`, not `.scpt` - **PLEASE NOTE .scpt is a different file format and will not work!**) and it must be saved using UTF-8 encoding. Within the script, use `"{popclip text}"` as the placeholder for the selected text. PopClip will replace the placeholders with the actual text before executing the script. Other fields are also available: see [Script Fields](#script-fields). See also [Example AppleScript File](#example-applescript-file).|
|`Shell Script File`|String|Required for Shell Script actions|The name of the shell script file to invoke. The file must exist in the extension's package. By default, the script is executed using `/bin/sh`. To use other scripting runtimes, you must _(1)_ set the script's executable mode bit using shell command `chmod +x <filename>`; and _(2)_ specify the script interpreter at the top of the file using a hashbang line such as `#/usr/bin/env ruby`. (Using `env` instead of a hard coded path is strongly recommended.) Within the script, access variables as described in [Script Fields](#script-fields). The current working directory will be set to the package directory. See [Example Shell Script File](#example-shell-script-file).|
|`Script Interpreter`|String|Optional|~~Specify the interpreter to use for `Shell Script File`. The default is `/bin/sh` but you could use, for example, `/usr/bin/ruby`.~~ **Deprecated** - use hashbang instead.
|`URL`|String|Required for URL actions|The URL to open when the user clicks the action. Use either `{popclip text}` or `***` as placeholder for the selected text. You can also put options here, in the same format as for AppleScripts. For example, `http://translate.google.com/#auto%7C{popclip option language}%7C{popclip text}`. The values will be URL-encoded by PopClip. Note that any `&` characters in the URL must be encoded as `&amp;` in the Config.plist.|
|`Key Combo`|Dictionary|Required for Keypress actions|Specify the keypress which will be generated by PopClip. See [Key Code format](#key-code-format). Key presses are delivered at the current app level, not at the OS level. This means PopClip is not able to trigger global keyboard shortcuts. So for example PopClip can trigger ⌘B for "bold" (if the app supports that) but not ⌘Tab for "switch app".|

### Action Properties

The following fields define properties of actions. They can appear at the top level of the configuration, in which case they will apply to all actions in the extension, or within an _(**BETA**`Action` or)_ `Actions` dictionary, in which case they will apply only to that specific action. 

|Key|Type|Required?|Description|
|---|----|---------|-----------|
|`Title`|String or Dictionary|Required (**BETA**: Optional)|The title is displayed on the action button if there is no icon. For extensions with icons, the title is displayed in the tooltip. If omitted, the action will take the extension name as its title.|
|`Icon`|String|Optional| The icon to show on the action button. See [Icons](#icons) for the icon specification format. _**BETA**: To explicitly specify no icon, set this field either to boolean `false` (in a plist) or to `null` (in JSON/YAML)._
|`Identifier`|String|Optional|A string to identify this action. In shell script and AppleScript actions, the identifier is passed to the script.|
|`Requirements`|Array|Optional|Array consisting of zero or more of the strings listed in [Requirements](#requirements). All the requirements in the array must be satisfied. If the array is omitted, the requirement `copy` is applied by default.|
|`Before`|String|Optional|String to indicate an action PopClip should take *before* performing the main action. See [Before and After](#before-and-after-keys).|
|`After`|String|Optional|String to indicate an action PopClip should take *after* performing the main action. See [Before and After](#before-and-after-keys).
|`Blocked Apps` _(**BETA**: `Excluded Apps`)_|Array|Optional|Array of bundle identifiers of applications. The action will not appear when PopClip is being used in any of the the specified apps.|
|`Required Apps`|Array|Optional|Array of bundle identifiers of applications. The action will only appear when PopClip is being used in one of the specified apps. *Note: This field does not make PopClip do a check to see if the app is present on the computer. For that, use the `App` field.*|
|`Regular Expression`|String|Optional|A [Regular Expression](http://regularexpressions.info/) to be applied to the selected text. The action will appear only if the text matches the regex, and the matching part of the text is passed to the action. The regex engine used is Cocoa's `NSRegularExpression`, which uses the [ICU specification](https://unicode-org.github.io/icu/userguide/strings/regexp.html) for regular expressions. _Note: There is no need to use your own regex to match URLs, email addresses or file paths. Use one of the `Requirements` keys `httpurl`, `httpurls`, `email` or `path` instead. Also be careful to avoid badly crafted regexes which never terminate against certain inputs._|
|`App`|Dictionary|Optional|Information about the app or website associated with this action. You can use this field to, optionally, specify that a certain app must be present on the system for the action to work. See [App Info](#app-info).|
|`Stay Visible`|Boolean|Optional|If `YES`, the PopClip popup will not disappear after the user clicks the action. (An example is the Formatting extension.) Default is `NO`.|
|`Capture HTML`|Boolean|Optional|If `YES`, PopClip will attempt to capture HTML and Markdown for the selection. PopClip makes its best attempt to extract HTML, first of all from the selection's HTML source itself, if available. Failing that, it will convert any RTF text to HTML. And failing that, it will generate an HTML version of the plain text. It will then generate Markdown from the final HTML. Default is `NO`.|

#### Requirements

These are the values supported by the `Requirements` field. Additionally, you can prefix any requirement with `!` to negate it.

|Value|Description|
|-----|-----------|
|`copy`|One or more characters of text must be selected. (The app's Copy command does not necessarily have to be available. It did in older versions of PopClip, hence the name.)
|`cut`|Text must be selected and the app's Cut command must be available.|
|`paste`|The app's Paste command must be available.|
|`httpurl`|The text must contain exactly one web URL (http or https).|
|`httpurls`|The text must contain one or more web URLs.|
|`email`|The text must contain exactly one email address.|
|`path`|The text must be a local file path, and it must exist on the local file system.| 
|`formatting`|The selected text control must support formatting. (PopClip makes its best guess about this, erring on the side of a false positive.)|
|`option-*=#`|The option named `*` must be equal to the string `#`. For example `option-fish=shark` would require an option named `fish` to be set to the value `shark`. This mechanism allows actions to be enabled and disabled via options.|

#### Before and After

The `cut`, `copy` and `paste` keys can be used in the `Before` field. All the values can be used in the `After` field.

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

#### App Info

|Key|Type|Required?|Description|
|---|----|---------|-----------|
|`Name`|String|Required|Name of the app which this extension interacts with. For example `Evernote` for an Evernote extension.|
|`Link`|String|Required|Link to a website where the user can get the app referred to in `Name`. For example `https://evernote.com/`.|
|`Check Installed`|Boolean|Optional|If `YES`, PopClip will check whether an app with one of the given `Bundle Identifiers` is installed when the user tries to use the extension. None is found, PopClip will show a message and a link to the website given in `Link`. Default is `NO`.|
|`Bundle Identifiers`|Array|Required if `Check Installed` is `YES`|Array of bundle identifiers for this app, including all application variants that work with this extension. In the simplest case there may be just one bundle ID. An app may have alternative bundle IDs for free/pro variants, an App Store version, a stand-alone version, a Setapp version, and so on. Include all the possible bundle IDs that the user might encounter.|

### Option Definition

Options are presented to the user in a preferences user interface window and are saved in PopClip's preferences on behalf of the extension. Options appear in the UI in the order they appear in the `Options` array. An option dictionary has the following structure. 

|Key|Type|Required?|Description|
|---|----|---------|-----------|
|`Option Identifier`|String|Required|Identifying string for this option. This is passed to your script. The identifier will be downcased or upcased for AppleScript and Shell Script targets, respectively — see [Script Fields](#script-fields).|
|`Option Type`|String|Required|One of the following: `string` (text box for free text entry), `boolean` (a check box), `multiple` (pop-up box with multiple choice options) or `password` (password entry field). Passwords are stored in user's keychain instead of app preferences.|
|`Option Label`|String or Dictionary|Required|The label to appear in the UI for this option.|
|`Option Description`|String or Dictionary|Optional|A longer description to appear in the UI to explain this option.|
|`Option Default Value`|String|Optional|This field specifies the default value of the option. If ommitted, `string` options default to the empty string, `boolean` options default to `true`, and `multiple` options default to the top item in the list. A `password` field may not have a default value.|
|`Option Values`|Array|Required for `multiple` type|Array of strings representing the possible values for the multiple choice option.|
|`Option Value Labels`|Array|Optional|Array of "human friendly" strings corresponding to the multiple choice values. This is used only in the PopClip options UI, and is not passed to the script. If ommitted, the option values themselves are shown.|

## Script Fields

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

## Additional Notes

### Example AppleScript File

**Important: AppleScript files must be in UTF-8 plain text format. (Save as 'text' format in AppleScript editor.)**

Here is an example of an AppleScript file for use in an extension (this one is for sending to Evernote):

    tell application "Evernote"
    	activate
    	set theNote to create note with text "{popclip text}"
    	open note window with theNote
    end tell

### Example Shell Script File
Here is an example of an shell script for use in an extension (this one is for 'Say'):

    #!/bin/sh
    echo $POPCLIP_TEXT | say

### Shell Script Testing

While developing a script, you can test it from the command line by exporting the required variables. For example:

    export POPCLIP_TEXT="my test text"
    export POPCLIP_OPTION_FOO="foo"
    ./myscript

### Script Returning Result

Scripts can return results if they specify one of the `*-result` keys in the Action's `After` field.

Scripts may indicate success or failure as follows.

|Result|Shell Script|AppleScript|
|------|------------|-----------|
|Success|Exit code `0`|Return without raising an error|
|General error. (PopClip will show an "X".)|Exit code `1`|Raise error with code `501`. Example AppleScript: `error "any text" number 501`.|
|Error with user's settings. (PopClip will show an "X" and pop up the extension's options UI.)|Exit code `2`|Raise error with code `502`. Example AppleScript: `error "any text" number 502`.|

Here is an example of a Ruby script that could be used in a shell script extension and the `After` key set to `paste-result`. 

    #!/usr/bin/env ruby
    input=ENV['POPCLIP_TEXT']
    # make the text ALL CAPS
    print input.upcase 

### Key Code format
Key presses should be expressed as a dictionary with the following keys:

|Key|Type|Required?|Description|
|---|----|------|----|
|`keyChar`|String|(see note below) |Character key to press. For example `A`.|
|`keyCode`|Number|(see note below) |Virtual key code for key to press. For example, the delete key is `51`. For help finding the code see [this StackOverflow question](http://stackoverflow.com/questions/3202629/where-can-i-find-a-list-of-mac-virtual-key-codes).|
|`modifiers`|Number|Required|Bitmask for modifiers to press. Use `0` for no modifiers. Shift=`131072`, Control=`262144`, Option=`524288`, Command=`1048576`. Add together the values to specify multiple modifiers (see table below).

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

[^1]: In some cases you may need to look into the Info.plist of the application to find the name defined in there under `NSServices` → `NSMenuItem`. An example of this is the `Make New Sticky Note` service which must be called as `Make Sticky`.