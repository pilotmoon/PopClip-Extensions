# PopClip Extensions

*Documentation for PopClip 1.5.8*

## Introduction

PopClip extensions add extra actions to [PopClip](http://pilotmoon.com/popclip). 

![Screenshot showing extensions in use.](https://raw.github.com/pilotmoon/PopClip-Extensions/master/docs/example.png)

This repository contains the documentation for making your own extensions (this readme file) as well as the source files for the extensions published on the main [PopClip Extensions](http://pilotmoon.com/popclip/extensions) page.

## License

All extension source files are published under the MIT License (see LICENSE) unless noted otherwise in the readme files of individual extensions.

## Credits

All the extensions and documentation were created by Nick Moore, except where stated. Contributor credits are are shown in the readme file of each individual extension.

## Contributing

Thank you for contributing! Contributors, please note the following:

* By contributing to this repo, you agree that your contribution may be published at [PopClip Extensions](https://pilotmoon.com/popclip/extensions/).
* I will choose which extensions to publish at my sole discretion, and I may make changes to any extension.
* Don't worry about signing the extension. I will take care of that.

## Useful Links

For an easy way to create certain types of extension with no coding necessary, check out Brett Terpstra's [PopMaker](http://brettterpstra.com/2014/05/12/popmaker-popclip-extension-generator/) app.

Here are some external "how to" guides for creating extensions:

- [Create Your Own Custom Extension for PopClip (Tuts+)](http://computers.tutsplus.com/tutorials/create-your-own-custom-extension-for-popclip--mac-50637)
- [PopClip: Scripting Extensions (Tuts+)](http://computers.tutsplus.com/tutorials/popclip-scripting-extensions--mac-55842)

## Disclaimer

These instructions are designed to help a technically competent person to create their own PopClip extension. Please note that user-created extensions are not an officially supported part of PopClip. You need to be comfortable with creating and editing plist files, scripts, and so on. 

I reserve the right to change or remove features in future versions of PopClip at any time.

## Extension Signing

By default, PopClip will display a warning dialog when you try to install your own extension, because it is not digitally signed by Pilotmoon Software.

![Example unsigned warning.](https://raw.github.com/pilotmoon/PopClip-Extensions/master/docs/ext_warning.png)

If you find this gets annoying while you are testing your work, you can turn off the warning. Run the following command at the Terminal, then Quit and restart PopClip:

    defaults write com.pilotmoon.popclip LoadUnsignedExtensions -bool YES

Please be aware that PopClip extensions can contain arbitrary executable scripts. Be careful about the extensions you create, and be wary about loading extensions you get from someone else. Proceed at your own risk.

## Extra Debugging Output

To help you when debugging Script extensions, PopClip can be configure to write script output and debug info to the console. To enable it, run this command in Terminal:

    defaults write com.pilotmoon.popclip EnableExtensionDebug -bool YES

## General Overview

### Types of Actions

There are five main kinds of actions supported by PopClip extensions.

| Action Type | Description | Example |
|------|-------------|---------|
|Service|Invoke a Mac OS X Service, passing the selected text.| [MakeSticky](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/MakeSticky)| 
|AppleScript|Run an AppleScript, with the selected text embedded.|[BBEdit](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/BBEdit)|
|Shell Script|Run a shell script, with the selected text passed as an environment variable.| [Say](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/Say)
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
Every extension must contain a `Config.plist` file. This should be in Apple [Property List](https://en.wikipedia.org/wiki/Property_list) format. The plist contains information about the extension, and also defines one or more *actions*. You can generate a blank plist with Xcode or a dedicated plist editor such as [PlistEdit Pro](http://www.fatcatsoftware.com/plisteditpro/
). Alternatively, use one of the existing extensions as a basis and edit with a text editor

Example plist: [ExampleConfig.plist](https://raw.github.com/pilotmoon/PopClip-Extensions/master/docs/ExampleConfig.plist).

Here is an example plist for 'Translate Tab', as viewed in Xcode:

![Example plist, for 'Translate Tab'.](https://raw.github.com/pilotmoon/PopClip-Extensions/master/docs/ttplist.png)

### Icons
Extensions may include icons to represent actions. The icon is displayed in the PopClip popup itself, and also in the preferences window and on the web site (if published). Icons may be created in any graphics program; I use [Pixelmator](http://www.pixelmator.com/).

For best results, the icon should be a square PNG file at least 256x256 pixels in size. The image should consist of a black figure on a transparent background. You can use opacity to achieve 'shades of grey'.

For example, here is the full-size icon file for 'Sort':

![The 'Sort' icon (256x256 PNG file)](https://github.com/pilotmoon/PopClip-Extensions/blob/master/source/Sort/sort.png?raw=true)

## Configuration Details

### General 
* All key names are case sensitive.
* Make sure that you set each field the correct type. A common error is to enter a number as a string type.

### "String or Dictionary" type

Fields with the type "String or Dictionary" can take either a String or Dictionary value. If you supply a string value, that string is always used. Alternatively, you can supply a dictionary mapping language code (`en`, `fr`, etc.) to a string. PopClip will display the appropriate string for the user's preferred language if possible, with fallback to the `en` string. 

### Plist Troubleshooting

Common reasons for malformed XML are:

* Missing end tags
* Mismatched start and end tags
* Unescaped `&` characters (`&` must be endoded as `&amp;`)

### Config.plist Structure
The `Config.plist` file has the following structure.

|Key|Type|Required?|Description|
|---|----|---------|-----------|
|`Extension Identifier`|String| Required |Provide a string which uniquely identifies this extension. Use your own prefix, ideally a reverse DNS-style prefix. For example `com.example.myextension`. Do not use the prefix `com.pilotmoon.` for your own extensions.|
|`Extension Name`|String or Dictionary| Required |This is a display name that appears in the preferences list of extensions.|
|`Extension Image File`|String|Optional|File name of the icon to represent this extension in the preferences window. The icon file must be contained in the extension package. If you omit this field, the icon for the first action will be used (if any), or else no icon will be displayed. See [Icons](#icons) for required icon format.|
|`Blocked Apps`|Array|Optional|Array of bundle identifiers strings (for example `com.apple.TextEdit`) of applications. The action will not appear when text is selected in the specified app(s).|
|`Required Apps`|Array|Optional|Array of bundle identifiers strings of applications. If this field is present, the action will only appear when text is selected in the specified app(s). *Note: This field does not make PopClip do a check to see if the app is present on the computer. For that, use the `Apps` field.*|
|`Regular Expression`|String|Optional|A [Regular Expression](http://regularexpressions.info/) to be applied to the selected text. The action will appear only if the text matches the regex. Furthermore, only the matching part of the text is used in the action. The default regex is `(?s)^.{1,}$` (note that `(?s)` turns on multi-line mode). *Note: There is no need to use your own regex to match URLs or email addresses. Use one of the `Requirements` keys `httpurl`, `httpurls` or `email` instead. Also be careful to avoid badly crafted regexes which never terminate against certain inputs. *|
|`Requirements`|Array|Optional|Array consisting of one or more of the strings listed in [Requirements keys](#requirements-keys). If this field is omitted, the default is `copy`.|
|`Stay Visible`|Boolean|Optional|If `YES`, the PopClip popup will not disappear after the user clicks the action. Default is `NO`.|
|`Preserve Image Color`|Boolean|Optional|If `YES`, the image file will be draw in its original color, instead of in white.|
|`Pass HTML`|Boolean|Optional|If `YES`, PopClip will pass the selected HTML text (if available) to the extension in the `POPCLIP_HTML` (shell scripts) and `{popclip html}` (AppleScript) fields. Default is `NO`. Leaving this set to `NO` PopClip does not have to process the HTML and this can be slightly faster.|
|`Long Running`|Boolean|Optional|Applies to AppleScript and Shell Script extension only. If `YES`, indicates that the script is expected to be long running. Set this if the script will normally take more than about 0.1 seconds to run, so PopClip knows to show the 'please wait' spinner. |
|`Restore Pasteboard`|Boolean|Optional|Applies when using to `paste-after` and `preview-result`. If set `YES`, PopClip will restore the previous pasteboard contents after pasting the result. Default is `NO`.|
|`Extension Description`|String or Dictionary|Optional|A short, human readable description of this extension.|
|`Extension Long Name`|String or Dictionary|Optional|You can include a long version of the extension name here. Appears on the web site but not in the app.|
|`Credits`|Array|Optional|An array of dictionaries. Information about the creator(s) of the extension. See [Credits Dictionary](#credits-dictionary).|
|`Apps`|Array|Optional|An array of dictionaries containing information about the apps or websites associated with this extension. You can use this field to, optionally, specify that a certain app must be present on the system for the action to work. See [Apps Dictionary](#apps-dictionary).|
|`Required OS Version`|String|Optional|Minimum version number of Mac OS X needed for this extension to work. For example `10.8.2`.|
|`Required Software Version`|Number|Optional|Minimum bundle version number of PopClip needed for this extension to work. For example `701` for PopClip 1.4.5.|
|`Actions`|Array|Required|Array of dictionaries defining the actions for this extension. See [Action Dictionary](#action-dictionary).|
|`Options`|Array|Optional|Array of dictionaries defining the options for this extension, if any. See [Option Dictionary](#option-dictionary).|
|`Options Title`|String or Dictionary|Optional|Title to appear at the top of the options window. Default is `Options for this extension.`.|

### Action Dictionary
Each action dictionary has the following structure. Exactly **one** of `Service Name`, `AppleScript File`, `Shell Script File`, `URL` or `Key Combo` should be specified.

|Key|Type|Required?|Description|
|---|----|---------|-----------|
|`Title`|String or Dictionary|Required|Format is as for `Extension Name` above. Note that every action must have a title. For extensions with icons, the title is displayed in the toolip when the user hovers over the action's button in PopClip.|
|`Image File`|String|Optional| File name of the icon for this action in PopClip. The icon file must be contained in the extension package. If you omit this field, the `Title` will be displayed instead. See [Icons](#icons) for required icon format. |
|`Service Name`|String|Required for Service actions|Exact name of the OS X service to call (as shown in the Services menu). For example, `Make Sticky`.|
|`AppleScript File`|String|Required for AppleScript actions|The name of the AppleScript file to use. The file must exist in the extension's package. The script must be a plain text file (save as `.applescript`, not `.scpt`) and it must be saved using UTF-8 encoding. Within the script, use `"{popclip text}"` as the placeholder for the selected text. Other fields are also available: see [Script Fields](#script-fields). See also [Example AppleScript File](#example-applescript-file).|
|`Shell Script File`|String|Required for Shell Script actions|The name of the shell script file to invoke. The file must exist in the extension's package. This will be passed as the parameter to `/bin/sh`. Within the script, use the environment variable `$POPCLIP_TEXT` to access the selected text. Other variables are also available: see [Script Fields](#script-fields). The current working directory will be set to the package directory. See also [Example Shell Script File](#example-shell-script-file).|
|`Script Interpreter`|String|Optional|Specify the interpreter to use for the script specified in `Shell Script File`. The default is `/bin/sh` but you could use, for example, `/usr/bin/ruby`.
|`URL`|String|Required for URL actions|The URL to open when the user clicks the action. Use `{popclip text}` as placeholder. For example, `http://translate.google.com/#auto%7Cauto%7C{popclip text}`. Any `&` characters must be XML-encoded as `&amp;`.|
|`Key Combo`|Dictionary|Required for Keypress actions|Specify the keypress which will be generated by PopClip. See [Key Code format](#key-code-format). Key presses are delivered at the current app level, not at the OS level. This means PopClip is not able to trigger global keyboard shortcuts. So for example PopClip can trigger ⌘B for "bold" (if the app supports that) but not ⌘Tab for "switch app".|
|`Before`|String|Optional|String to indicate an action PopClip should take *before* performing the main action. See [Before and After keys](#before-and-after-keys).|
|`After`|String|Optional|String to indicate an action PopClip should take *after* performing the main action. See [Before and After keys](#before-and-after-keys).|
|`Blocked Apps`|Array|Optional|As above; this value overrides the value specified in the extension header. |
|`Required Apps`|Array|Optional|As above; this value overrides the value specified in the extension header. |
|`Regular Expression`|String|Optional|As above; this value overrides the value specified in the extension header.|
|`Requirements`|Array|Optional|As above; this value overrides the value specified in the extension header. |
|`Stay Visible`|Boolean|Optional|As above; this value overrides the value specified in the extension header.|
|`Preserve Image Color`|Boolean|Optional|As above; this value overrides the value specified in the extension header.|
|`Pass HTML`|Boolean|Optional|As above; this value overrides the value specified in the extension header.|
|`Restore Pasteboard`|Boolean|Optional|As above; this value overrides the value specified in the extension header.|
|`Long Running`|Boolean|Optional|As above; this value overrides the value specified in the extension header.|


### Requirements keys

These are the values supported by the `Requirements` field. Additionally, you can prefix any requirement with `!` to negate it. For example, `!paste` if you only want the action to appear when Paste is *not* available.

|Value|Description|
|-----|-----------|
|`copy`|The system Copy command must be available (that is, the Copy item in the Edit menu must not be greyed out).|
|`cut`|The system Cut command must be available.|
|`paste`|The system Paste command must be available.|
|`formatting`|The selected text control must support formatting.|
|`httpurl`|Require the text to contain exactly one HTTP(S) URL; only the matching part will be passed to the action.|
|`httpurls`|Require the text to contain one or more HTTP(S) URLs.|
|`email`|Require the text to contain exactly one email address; only the matching part will be passed to the action.|
|`path`|Require the text to contain exactly one local file path; only the matching part will be passed to the action.| 
|`html`|Selection must be HTML text (for example, text in a web page).|
|`option-*=#`|The option named `*` must be equal to the string `#`. For example `option-fish=1` would require an option named `fish` to be set on. This mechanism allows actions to be enabled and disabled via options.|

### Before and After keys

These are the values supported by the `Before` and `After` fields.

|Value|Description|
|-----|-----------|
|`cut`|Perform system Cut command, as if user pressed ⌘X.|
|`copy`|Perform system Copy command, as if user pressed ⌘C.|
|`paste`|Perform system Paste command, as if user pressed ⌘V.|
|`paste-plain`|Strip the system pasteboard down to plain text only, then perform system Paste command, as if user pressed ⌘V.|
|`popclip-appear`|Makes PopClip invoke itself again. (This is used in the Select All extension).|
|`copy-selection`|Copy the originally selected text as plain text. (This is used in the Swap extension.)|
|`copy-result`|Copy the text returned from the script script to the clipboard. Displays "Copied" notification. If there is no text, or the script failed, shows an 'X'.|
|`paste-result`|If the system Paste command is available, paste the text returned from the script, as well as copy it to the clipboard. Otherwise, only copy it as in `copy-result`. If there is no text, or the script failed, shows an 'X'.|
|`preview-result`|Copy the text returned from the script to the clipboard, and show the result as well (truncated to 100 characters). If the system Paste command is available, the preview text can be clicked to paste it. If there is no text, or the script failed, shows an 'X'.|
|`show-result`|Show the text returned from the script. If there is no text, or the script failed, shows an 'X'.|
|`show-status`|Show a tick or a 'X', depending on whether the script succeeded ort not.|

### Option Dictionary

Options are presented to the user in a preferences window and are saved by PopClip's preferences on behalf of the extension. Each option dictionary has the following structure.

|Key|Type|Required?|Description|
|---|----|---------|-----------|
|`Option Identifier`|String|Required|Unique identifying string for this option. **It must be an all-lowercase string.** This field is used to pass the option to your script. (See [Script Fields](#script-fields).)|
|`Option Type`|String|Required|One of the following: `string` (text box for free text entry), `boolean` (a check box) or `multiple` (pop-up box with multiple choice options).|
|`Option Label`|String or Dictionary|Required|Label to appear in the user interface for this option.|
|`Option Default Value`|String|Optional|For `string`, `boolean` and `multi` types, this field specified the default value of the option.|
|`Option Values`|Array|Required for `multiple` type|Array of strings representing the possible values to show in the pop-up button.|


### Script Fields

These strings are available in Shell Script and AppleScript extensions. Where no value is available, the field will be set to an empty string.

|Shell Script Variable|AppleScript Field|Description|
|---------------------|-----------------|-----------|
|`POPCLIP_TEXT`|`{popclip text}`|The selected text, without formatting.|
|`POPCLIP_URLENCODED_TEXT`|`{popclip urlencoded text}`|URL-encoded form of the selected text. For example, if the selected text is `push / pull` this field will contain `push%20%2F%20pull`.|
|`POPCLIP_URLS`|`{popclip urls}`|Newline-separated list of URLs which PopClip detected in the selected text.|
|`POPCLIP_URL_TITLES`|`{popclip url titles}`|Newline-separated list of titles for the urls in `POPCLIP_URLS` which PopClip detected in the selected text. If no title is available, the string will contain an empty line.|
|`POPCLIP_HTML`|`{popclip html}`|The selected text in HTML format, if available. The `Pass HTML` field must be set to `YES` to receive this field.|
|`POPCLIP_MODIFIER_FLAGS`|`{popclip modifier flags}`|Modifier flags for the keys held down when the extension's button was clicked in PopClip. Values are as defined in [Key Code format](#key-code-format). For example, `0` for no modifiers, or `131072` if shift is held down.|
|`POPCLIP_BUNDLE_IDENTIFIER`|`{popclip bundle identifier}`|Bundle identifier of the app the text was selected in. For example, `com.apple.Safari`.|
|`POPCLIP_APP_NAME`|`{popclip app name}`|Name of the app the text was selected in. For example, `Safari`.|
|`POPCLIP_BROWSER_TITLE`|`{popclip browser title}`|The title of the web page that the text was selected from. (Safari and Chrome only.)|
|`POPCLIP_SPECIAL_BROWSER_TITLE`|`{popclip special browser title}`|The title of the web page, ONLY only if the user selected the URL in the address bar (i.e. this is likely the title of the corresponding web page to the URL). (Safari and Chrome only.)|
|`POPCLIP_BROWSER_URL`|`{popclip browser url}`|The URL of the web page that the text was selected from. (Safari and Chrome only.)|
|`POPCLIP_DECIMAL_SEPARATOR`|n/a|The decimal separator character according to the OS X system locale. For example: `.`|
|`POPCLIP_GROUPING_SEPARATOR`|n/a|The number grouping (thousands separator) character according to the OS X system locale. For example: `,`|
|`POPCLIP_OPTION_*` *(all UPPERCASE)*|`{popclip option *}` *(all lowercase)*|One such value is generated for each option specified in `Options`, where `*` represents the `Option Identifier`. For boolean options, the value with be a string, either `0` or `1`.|

### Credits Dictionary

|Key|Type|Required?|Description|
|---|----|---------|-----------|
|`Name`|String|Required|Name or identifier of the contributor. For example `John Smith`.|
|`Link`|String|Optional|A link to the contributor's website or other URL. For example `http://johnsmith.com`|

### Apps Dictionary

|Key|Type|Required?|Description|
|---|----|---------|-----------|
|`Name`|String|Required|Name of the app which this extension interacts with. For example `Evernote` for an Evernote extension.|
|`Check Installed`|Boolean|Optional|If `YES`, PopClip will check whether the app given by `Bundle Identifier` is installed when the user tries to use the extension. If missing, PopClip will show a message and a link to the website given in `Link`. Default is `NO`.|
|`Link`|String|Required if `Check Installed` is `YES`|Link to a website where the user can get the app referred to in `Name`. For example `http://evernote.com`.|
|`Bundle Identifier`|String|Required if `Check Installed` is `YES`|Bundle identifier of the application. For example `com.evernote.Evernote`. Use this if the app has only one identifier.|
|`Bundle Identifiers`|Array|Required if `Check Installed` is `YES`|All possible bundle identifiers of the application. Use this if an app has multiple variants, for example, Pro and Free variants, or if an app use a different bundle ID for the App Store version to the stand-alone version. Include all the possible bundle IDs as an array.|

Only one of `Bundle Identifier` or `Bundle Identifiers` is required, not both.

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

    echo $POPCLIP_TEXT | say

### Script Returning Result

Scripts can return results if they specify one of the `*-result` or `show-status` keys in the Action's `After` field.

Scripts should indicate success or failure as follows. If the script indicates a failure with settings, it will cause the extension's options window to appear (if it has one).

|Result|Shell Script|AppleScript|
|------|------------|-----------|
|Success|Return status code `0`|Return without raising an error|
|General failure|Return status code `1`|Raise error with code `501`. Example AppleScript: `error "any text" number 501`.|
|Failure with settings|Return status code `2`|Raise error with code `502`. Example AppleScript: `error "any text" number 502`.|

Here is an example of a Ruby script that could be used in a shell script extension (with the `Script Interpreter` set to `/usr/bin/ruby`) and the `After` key set to `paste-result`. 

    input=ENV['POPCLIP_TEXT']
    # make the text ALL CAPS
    print input.upcase 

See also the [Uppercase](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/Uppercase) extension for a working example. 

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

