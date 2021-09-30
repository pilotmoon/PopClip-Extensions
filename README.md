# PopClip Extensions

*This document applies to PopClip 2021.10 (3543).

----

## Changes to script extensions for Monterey

### The changes

PopClip can now execute scripts that specify their interpreter with a [hashbang](https://scriptingosx.com/2017/10/on-the-shebang/). Previously, an executable path had to be hard-coded in the `Script Interpreter` field.

The user's `PATH` is also now added to the script variables. This lets you use `env` in the hashbang, for example `#!/usr/bin/env php`, so that the scripting runtime's path doesn't have to be hard coded.

When using scripts like this, you also need to make sure the script itself is executable. You can do this with the command `chmod +x <filename>`.

### Background info

Apple officially announced their intention to remove pre-installed scripting languages from macOS in 2019, with the following note in the [macOS Catalina release notes](https://developer.apple.com/documentation/macos-release-notes/macos-catalina-10_15-release-notes):

> Scripting language runtimes such as Python, Ruby, and Perl are included in macOS for compatibility with legacy software. Future versions of macOS won’t include scripting language runtimes by default, and might require you to install additional packages. If your software depends on scripting languages, it’s recommended that you bundle the runtime within the app.

Now fast-forward to 2021, and PHP has been removed in macOS Monterey. The other languages remain for now. The removal of `/usr/bin/php` affects many of the official PopClip extensions, and maybe some of your own extensions too.

Thankfully, installing scripting languages yourself is straightforward, especially with tools like homebrew. However whilst this is great for power users, this isn't a good solution for the non-technical user.

Assuming the other languages will eventually be removed too, my plan has been to add JavaScript as a scripting language to PopClip, hosted within PopClip itself. This will be the main scripting language for new official extensions. The JS work is going well — I am still finalising the implementation and will release the documentation when it is ready.

For those of you wishing to continue to write your own extensions in self-installed scripting languages such as PHP, Perl, Ruby and Python, I made the above change.

----

## Changes in PopClip 2021.10

- Executable shell scripts now have the `PATH` set in the script variables, so they can now use hashbang with `env` such as `#!/usr/bin/env perl` to avoid having to hard code the path.
- Brought back `Preserve Image Color`.

## Changes in PopClip 2021.9

PopClip 2021.9 introduces several new fields and some other changes. Lots of these changes come from your feedback, so thanks for those of you who have got in touch. Everything should be backward compatible, so where I have made any changes PopClip still accepts old format too. This document only shows the current, recommended fields. Main highlights:

- PopClip now supports SVG image files as well as allowing you to specifiy an image as a SF Symbols identifier or to generate an icon from up to 3 letters of text. Renamed the `Image File` field to `Icon`. 
- PopClip now provides an HTML and a Markdown version for all text selections, when `Pass HTML` is set. When the content is not HTML backed, the HTML and Markdown is generated from the selected RTF or plain text content.
- The `POPCLIP_HTML` field is now sanitized to remove CSS, potentially unsafe tags, and to fix invalid markup. The unsanitized HTML is also available in a new field `POPCLIP_RAW_HTML`. The markdownified HTML is in the new `POPCLIP_MARKDOWN` field.
- Added `POPCLIP_ACTION_IDENTIFIER` field. This is passed to the action script allowing you to use the same script for multiple actions.
- Added `POPCLIP_FULL_TEXT` field. This is always contains the full selected text in cases where `POPCLIP_TEXT` only contains the part of text matched by regex or requirement.
- Added `Option Value Labels` array so that the options list can show a display name different to option string value itself.
- Added `Option Description` field to add more information in the UI about an option.
- `Apps` array is now a single `App` dictionary (since it turns out we hardly ever need to specify more than one app).
- Shell scripts with the executable bit set can optionally specify their interpreter with a hashbang, instead of the `Script Interpreter` field.
- Removed the `html` requirement since all selections now come with HTML (as above).
- ~~Removed the `Preserve Image Color` option. PopClip now always converts the icon to monochrome.~~
- Removed the `Restore Pasteboard` option. PopClip now always restores the pasteboard, unless using the `*-result` keys.
- Removed the `Long Running` option. All extensions are now assumed to be potentially long running.

I've also made the error checking when loading an extension more robust, so errors such as incorrect field types will now be caught. And you'll get an more specific message about what the problem is.

One more thing... there is also a brand new extension format based on JavaScript. Documentation still "to-do", watch this space!

----

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

* `<filename>.png` or `<filename>.svg` specifies an image file within the extension package, in either PNG or SVG format. You can create your own with an image editor, or you could use icons from a website like [The Noun Project](https://thenounproject.com)] or the macOS app [IconJar](https://geticonjar.com/resources/). Please include any applicable copyright attribution in a README file.

* `symbol:<symbol name>` specifies an [SF Symbols](https://sfsymbols.com) name, for example `symbol:flame`. Symbols are only available on macOS 11.0 and above. Also note that some symbols require higher macOS versions as indicated in the "Availability" panel in Apple's SF Symbols browser app. (If the symbol does not exist on the version of macOS the user is running, it will be as if no icon was specified, and the extension will display the text title instead. You should probably specify an appropriate `Required OS Version` of when using a symbol icon.)

* `text:<text icon specifier>` instructs PopClip to generate a text-based icon, as described below.

PNG and SVG icons should be square and monochrome. The image should be black, on a transparent background. You can use opacity to create shading. PNG icons should be at least 256x256 pixels in size. 

### Text-based icons

Text-based icons can up to three characters, on their own or within an enclosing shape. The enclosing shape is specified using different kinds of brackets around the text. The easiest way to explain is probably by example:

* `text:A` - the letter A on its own

* `text:(1)` - the digit 1 in an outline circle

* `text:((本))` - the character 本 in a filled circle

* `text:[xyz]` - the characters xyz in an outline square

* `text:[[!]]` - the character ! in a filled square

## Configuration Details

### General 
* All key names are case sensitive.
* Make sure that you set each field the correct type. A common error is to enter a number as a string type.

### "String or Dictionary" type

Fields shown as "String or Dictionary" type are localizable strings. The field may be either a string or dictionary. If you supply a string, that string is always used. If you supply a dictionary mapping language codes (`en`, `fr`, `zh-Hans`, etc.) to a string. PopClip will display the string for the user's preferred language if possible, with fallback to the `en` string.

### Plist Troubleshooting

Common reasons for malformed XML are:

* Missing end tags
* Mismatched start and end tags
* Unescaped `&` characters (`&` must be encoded as `&amp;`)

### Config.plist Structure
The `Config.plist` file has the following structure.

|Key|Type|Required?|Description|
|---|----|---------|-----------|
|`Extension Identifier`|String| Required |Provide a string which uniquely identifies this extension. Use your own prefix, ideally a reverse DNS-style prefix. For example `com.example.myextension`. Do not use the prefix `com.pilotmoon.` for your own extensions.|
|`Extension Name`|String or Dictionary| Required |This is a display name that appears in the preferences list of extensions.|
|`Extension Icon`|String|Optional|See [Icons](#icons). If you omit this field, the icon for the first action will be used (if any), or else no icon will be displayed. |
|`Extension Description`|String or Dictionary|Optional|A short, human readable description of this extension. Appears on the web site but not in the app.|
|`App`|Dictionary|Optional|Information about the app or website associated with this extension. You can use this field to, optionally, specify that a certain app must be present on the system for the action to work. See [App Info Dictionary](#app-dictionary).|
|`Required OS Version`|String|Optional|Minimum version number of Mac OS X needed by this extension. For example `10.8.2` or `11.0`.|
|`Required Software Version`|Integer|Optional|Minimum version number of PopClip needed by this extension. This is the numeric version as shown in brackes in PopClip's about pane. I recommend using `3543` for new extensions based on this document.|
|`Actions`|Array|Required|Array of dictionaries defining the actions for this extension. See [Action Dictionary](#action-dictionary).|
|`Options`|Array|Optional|Array of dictionaries defining the options for this extension, if any. See [Option Dictionary](#option-dictionary).|
|`Options Title`|String or Dictionary|Optional|Title to appear at the top of the options window. Default is `Options for <extension name>`.|

### Action Dictionary
The action dictionary has the following structure. Exactly **one** of `Service Name`, `AppleScript File`, `Shell Script File`, `URL` or `Key Combo` should be specified. The other keys can also be placed at the top level of the config file, in which case they act as a fallback for all actions in the extension which don't supply their own value.

|Key|Type|Required?|Description|
|---|----|---------|-----------|
|`Title`|String or Dictionary|Required|Every action must have a title. The title is displayed on the action button if there is no icon. For extensions with icons, the title is displayed in the tooltip.|
|`Identifier`|String|Optional|A string which will be passed along in the script fields. There is no required format. The purpose of this field is to allow the script to identify which action called it, in the case that multiple actions use the same script.|
|`Icon`|String|Optional| See [Icons](#icons). If you omit this field, the `Title` will be displayed instead. |
|`Service Name`|String|Required for Service actions|Exact name of the OS X service to call (as shown in the Services menu). For example, `Make Sticky`.|
|`AppleScript File`|String|Required for AppleScript actions|The name of the AppleScript file to use. The file must exist in the extension's package. The script must be a plain text file (save as `.applescript`, not `.scpt` - **PLEASE NOTE .scpt is a different file format and will not work!**) and it must be saved using UTF-8 encoding. Within the script, use `"{popclip text}"` as the placeholder for the selected text. PopClip will replace the placeholders with the actual text before executing the script. Other fields are also available: see [Script Fields](#script-fields). See also [Example AppleScript File](#example-applescript-file).|
|`Shell Script File`|String|Required for Shell Script actions|The name of the shell script file to invoke. The file must exist in the extension's package. Within the script, use the shell variable `POPCLIP_TEXT` to access the selected text. Other variables are also available: see [Script Fields](#script-fields). The current working directory will be set to the package directory. See also [Example Shell Script File](#example-shell-script-file).|
|`Script Interpreter`|String|Optional|Specify the interpreter to use for `Shell Script File`. The default is `/bin/sh` but you could use, for example, `/usr/bin/ruby`. As an alternative to setting this field, you can make the script file executable (with `chmod +x`) and include a [hashbang](https://scriptingosx.com/2017/10/on-the-shebang/) (for example `#!/usr/bin/env perl`) at the top of the script. I recommend using `env` in the hashbang to avoid to hardcoding the path.
|`URL`|String|Required for URL actions|The URL to open when the user clicks the action. Use `{popclip text}` as placeholder for the selected text. You can also put options here, in the same format as for AppleScripts. For example, `http://translate.google.com/#auto%7C{popclip option language}%7C{popclip text}`. The values will be URL-encoded by PopClip. Note that any `&` characters in the URL must be encoded as `&amp;` in the Config.plist.|
|`Key Combo`|Dictionary|Required for Keypress actions|Specify the keypress which will be generated by PopClip. See [Key Code format](#key-code-format). Key presses are delivered at the current app level, not at the OS level. This means PopClip is not able to trigger global keyboard shortcuts. So for example PopClip can trigger ⌘B for "bold" (if the app supports that) but not ⌘Tab for "switch app".|
|`Before`|String|Optional|String to indicate an action PopClip should take *before* performing the main action. See [Before and After keys](#before-and-after-keys).|
|`After`|String|Optional|String to indicate an action PopClip should take *after* performing the main action. See [Before and After keys](#before-and-after-keys).
|`Blocked Apps`|Array|Optional|Array of bundle identifiers of applications. The action will not appear when PopClip is being used in any of the the specified apps.|
|`Required Apps`|Array|Optional|Array of bundle identifiers of applications. The action will only appear when PopClip is being used in one of the specified apps. *Note: This field does not make PopClip do a check to see if the app is present on the computer. For that, use the `App` field.*|
|`Regular Expression`|String|Optional|A [Regular Expression](http://regularexpressions.info/) to be applied to the selected text. The action will appear only if the text matches the regex, and the matching part of the text is passed to the action. The regex engine used is Cocoa's `NSRegularExpression`, which uses the [ICU specification](https://unicode-org.github.io/icu/userguide/strings/regexp.html) for regular expressions. _Note: There is no need to use your own regex to match URLs, email addresses or file paths. Use one of the `Requirements` keys `httpurl`, `httpurls`, `email` or `path` instead. Also be careful to avoid badly crafted regexes which never terminate against certain inputs._|
|`Requirements`|Array|Optional|Array consisting of zero or more of the strings listed in [Requirements keys](#requirements-keys). All the requirements in the array must be satisfied. If the array is omitted, the requirement `copy` is applied by default.|
|`Stay Visible`|Boolean|Optional|If `YES`, the PopClip popup will not disappear after the user clicks the action. (An example is the Formatting extension.) Default is `NO`.|
|`Pass HTML`|Boolean|Optional|If `YES`, PopClip will attempt to capture HTML and Markdown for the selection. PopClip makes its best attempt to extract HTML, first of all from the selection's HTML source itself, if available. Failing that, it will convert any RTF text to HTML. And failing that, it will generate an HTML version of the plain text. It will then generate Markdown from the final HTML. Default is `NO`.|

### Requirements keys

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

### Before and After keys

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

### Option Dictionary

Options are presented to the user in a preferences user interface window and are saved in PopClip's preferences on behalf of the extension. Options appear in the UI in the order they appear in the options array. An option dictionary has the following structure. 

|Key|Type|Required?|Description|
|---|----|---------|-----------|
|`Option Identifier`|String|Required|Identifying string for this option. This is passed to your script. The identifier will be downcased or upcased for AppleScript and Shell Script targets, respectively — see [Script Fields](#script-fields).|
|`Option Type`|String|Required|One of the following: `string` (text box for free text entry), `boolean` (a check box), `multiple` (pop-up box with multiple choice options) or `password` (password entry field). Passwords are stored in user's keychain instead of app preferences.|
|`Option Label`|String or Dictionary|Required|The label to appear in the UI for this option.|
|`Option Description`|String or Dictionary|Optional|A longer description to appear in the UI to explain this option.|
|`Option Default Value`|String|Optional|This field specifies the default value of the option. If ommitted, `string` options default to the empty string, `boolean` options default to `true`, and `multiple` options default to the top item in the list. A `password` field may not have a default value.|
|`Option Values`|Array|Required for `multiple` type|Array of strings representing the possible values for the multiple choice option.|
|`Option Value Labels`|Array|Optional|Array of "human friendly" strings corresponding to the multiple choice values. This is used only in the PopClip options UI, and is not passed to the script. If ommitted, the option values themselves are shown.|


### Script Fields

These strings are available in Shell Script and AppleScript extensions. Where no value is available, the field will be set to an empty string.

|Shell Script Variable|AppleScript Field|Description|
|---------------------|-----------------|-----------|
|`POPCLIP_EXTENSION_IDENTIFIER`|`{popclip extension identifier}`|This extension's identifier.|
|`POPCLIP_ACTION_IDENTIFIER`|`{popclip action identifier}`|The identifier specified in the action's configuration, if any.|
|`POPCLIP_TEXT`|`{popclip text}`|The part of the selected plain text matching the specified regex or requirement.|
|`POPCLIP_FULL_TEXT`|`{popclip full text}`|The selected plain text in its entirety.|
|`POPCLIP_URLENCODED_TEXT`|`{popclip urlencoded text}`|URL-encoded form of the matched text.|
|`POPCLIP_HTML`|`{popclip html}`|Sanitized HTML for the selection. CSS is removed, potentially unsafe tags are removed and markup is corrected. (`Pass HTML` must be specified.)|
|`POPCLIP_RAW_HTML`|`{popclip raw html}`|The original unsanitized HTML, if available. (`Pass HTML` must be specified.)|
|`POPCLIP_MARKDOWN`|`{popclip markdown}`|A conversion of the HTML to Markdown. (`Pass HTML` must be specified.)|
|`POPCLIP_URLS`|`{popclip urls}`|Newline-separated list of web URLs that PopClip detected in the selected text.|
|`POPCLIP_MODIFIER_FLAGS`|`{popclip modifier flags}`|Modifier flags for the keys held down when the extension's button was clicked in PopClip. Values are as defined in [Key Code format](#key-code-format). For example, `0` for no modifiers, or `131072` if shift is held down.|
|`POPCLIP_BUNDLE_IDENTIFIER`|`{popclip bundle identifier}`|Bundle identifier of the app the text was selected in. For example, `com.apple.Safari`.|
|`POPCLIP_APP_NAME`|`{popclip app name}`|Name of the app the text was selected in. For example, `Safari`.|
|`POPCLIP_BROWSER_TITLE`|`{popclip browser title}`|The title of the web page that the text was selected from. (Supported browsers only.)|
|`POPCLIP_BROWSER_URL`|`{popclip browser url}`|The URL of the web page that the text was selected from. (Supported browsers only.)|
|`POPCLIP_OPTION_*` *(all UPPERCASE)*|`{popclip option *}` *(all lowercase)*|One such value is generated for each option specified in `Options`, where `*` represents the `Option Identifier`. For boolean options, the value with be a string, either `0` or `1`.|

### App Info Dictionary

|Key|Type|Required?|Description|
|---|----|---------|-----------|
|`Name`|String|Required|Name of the app which this extension interacts with. For example `Evernote` for an Evernote extension.|
|`Link`|String|Required|Link to a website where the user can get the app referred to in `Name`. For example `https://evernote.com/`.|
|`Check Installed`|Boolean|Optional|If `YES`, PopClip will check whether an app with one of the given `Bundle Identifiers` is installed when the user tries to use the extension. None is found, PopClip will show a message and a link to the website given in `Link`. Default is `NO`.|
|`Bundle Identifiers`|Array|Required if `Check Installed` is `YES`|Array of bundle identifiers for this app, including all application variants that work with this extension. In the simplest case there may be just one bundle ID. An app may have alternative bundle IDs for free/pro variants, an App Store version, a stand-alone version, a Setapp version, and so on. Include all the possible bundle IDs that the user might encounter.|

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

