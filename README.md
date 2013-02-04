# PopClip Extensions

*Documentation for PopClip 1.4.4*

## Introduction

PopClip extensions add extra actions to [PopClip](http://pilotmoon.com/popclip). 

![Screenshot showing extensions in use.](https://raw.github.com/pilotmoon/PopClip-Extensions/master/docs/extpic.png)

This repository contains the documentation for making your own extensions (this readme file) as well as the source files for the extensions published on the main [PopClip Extensions](http://pilotmoon.com/popclip/extensions) page. Layout of the repo:

    docs/                 -- Image files and resources referred to in this README file.
    extensions/           -- Distributable versions of the extensions (zipped, with `.popclipextz` extension)
    source/               -- Source files for the extensions. The directories are left without the `.popclipext`
                             extension, for easier editing.
    README.md             -- This documentation.
    LICENSE               -- MIT License text.
    Index.plist           -- The main page is auto-generated using Index.plist to specify the contents.


## License

All extension source files are published under the MIT License (see LICENSE) unless noted otherwise in the readme files of individual extensions.

## Credits

All the extensions and documentation were created by Nick Moore except where stated. Contributor credits are are shown in the readme file of each individual extension.

## Contributing

Contribtions to this repo via pull requests are welcome. Contributors, please note the following:

* If you contribute an extension, I will assume you are happy for me to publish your contributions on the main PopClip extensions page.
* I might not publish your extension. I choose which extensions to publish at my sole discretion. 
* I may make changes to any extension, as I see fit.
* Please do not edit the Index.plist file.
* Don't worry about signing the extension, I will take care of that.

If you are not happy with nay of the above, it's probably better if you just host the extension on your own site.

## Other Repos

Here are some other repos you might find interesting:

* PopClip extensions by [Andy Guzman](https://github.com/andyguzman/PopClippins)
* PopClip extensions by [Lucifr](https://github.com/lucifr/PopClip-Extensions)
* PopClip extensions by [Brett Terpstra](https://github.com/ttscoff/popclipextensions)
* PopClip extensions by [hzlzh](https://github.com/hzlzh/PopClip-Extensions)

## Disclaimer

These instructions are designed to help a technically competent person to create their own PopClip extension. Please note that user-created extensions are not an officially supported part of PopClip. You need to be comfortable with creating and editing plist files, scripts, and so on. 

I reserve the right to change or remove features in future versions of PopClip at any time.

## Extension Signing

By default, PopClip will display a warning dialog when you try to install your own extension, because it is not digitally signed by Pilotmoon Software.

![Example unsigned warning.](https://raw.github.com/pilotmoon/PopClip-Extensions/master/docs/ext_warning.png)

If you find this gets annoying while you are testing your work, you can turn off the warning. Run the following command at the Terminal, then Quit and restart PopClip:

    defaults write com.pilotmoon.popclip LoadUnsignedExtensions -bool YES

Please be aware that PopClip extensions can contain arbitrary executable scripts. Be careful about the extensions you create, and be wary about loading extensions you get from someone else. Proceed at your own risk.

## General Overview

### Types of Actions

There are five main kinds of actions supported by PopClip extensions.

| Action Type | Description | Example |
|------|-------------|---------|
|Service|Invoke a Mac OS X Service, passing the selected text.| [MakeSticky](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/MakeSticky)| 
|AppleScript|Run an AppleScript, with the selected text embedded.|[Evernote](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/Evernote)|
|Shell Script|Run a shell script, with the selected text passed as an environment variable.| [Say](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/Say)
|URL|Open an HTTP URL, with the selected text URL-encoded and inserted.|[GoogleTranslate](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/GoogleTranslate)|
|Keypress|Press a key combination.| [Delete](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/Delete)|


### Filtering
All extensions have access to the following filtering mechanisms, to help prevent them appearing when they are not useful:

* Filter by matching a regular expression.
* Filter by application (either include or exclude).
* Filter by whether cut, copy or paste is available.
* Filter by whether the text contains a URL, email address or file path.

### Limitations
Whilst the extensions mechanism is quite flexible, there are some limitations worth pointing out:

* The selected text is passed as plain text. Formatting is not preserved.
* Extensions cannot have their own preferences options. Everything must be pre-set in the extension package. Therefore, actions that would require the user to enter a username/password are currently not supported. (Although you could hard code these in your own private extensions.)


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
Every extension must contain a `Config.plist` file. This should be an XML-format plist. The plist contains information about the extension, and also defines one or more *actions*. You can generate a blank plist with Xcode or use this example as a basis: [ExampleConfig.plist](https://raw.github.com/pilotmoon/PopClip-Extensions/master/docs/ExampleConfig.plist). Alternatively, use a dedicated plist editor such as the excellent [PlistEdit Pro](http://www.fatcatsoftware.com/plisteditpro/
). Here is an example of the plist for 'Say', as viewed in Xcode:

![Example plist, for 'Say'.](https://raw.github.com/pilotmoon/PopClip-Extensions/master/docs/sayplist.png)

### Icons
Extensions may include icons to represent actions. The icon is displayed in the PopClip popup itself, and also in the preferences window.  Icons may be created in any graphics program. (I use [Pixelmator](http://www.pixelmator.com/).)  The icon should:

* be a PNG file
* be square
* be at least 256x256 pixels
* consist of solid black figure on a transparent background

Here is the icon file for 'Say':

![The 'Say' icon (256x256 PNG file)](https://raw.github.com/pilotmoon/PopClip-Extensions/master/source/Say/speechicon.png)

## Configuration Details

### General 
* All key names are case sensitive.
* Make sure that you set each field the correct type. A common error is to enter a number as a String type.

### Config.plist Structure
The `Config.plist` file has the following structure.

|Key|Type|Required?|Description|
|---|----|---------|-----------|
|`Extension Identifier`|String| Required |Provide a string which uniquely identifies this extension. I recommend you use your own prefix, ideally a reverse DNS-style domain name based prefix. For example `com.my-domain-name.my-extension-identifier`.|
|`Extension Name`|String OR Dictionary| Required | ![Display names in use.](https://raw.github.com/pilotmoon/PopClip-Extensions/master/docs/names.png)<br>This is a display name that appears in the preferences list of extensions.  If you supply a string value, that string is always used. Alternatively, you can supply a dictionary mapping language code (`en`, `fr`, etc.) to a string. PopClip will display the appropriate string for the user's preferred language if possible, with fallback to the `en` string. |
|`Extension Image File`|String|Optional|File name of the icon to represent this extension in the preferences window. The icon file must be contained in the extension package. If you omit this field, the icon for the first action will be used (if any), or else no icon will be displayed. See [Icons](#icons) for required icon format.|
|`Blocked Apps`|Array|Optional|Array of bundle identifier strings (e.g. `com.apple.TextEdit`) of applications for which this extension's actions should not appear.|
|`Required Apps`|Array|Optional|Array of bundle identifier strings of applications required for this extension's actions to appear. |
|`Regular Expression`|String|Optional|A [Regular Expression](http://regularexpressions.info/) to be applied to the selected text. The action will appear only if the text matches the regex. Furthermore, only the matching part of the text is used in the action. The default regex is `(?s)^.{1,}$` (note that `(?s)` turns on multi-line mode). The engine used is [RegexKitLite](http://regexkit.sourceforge.net/RegexKitLite/).|
|`Requirements`|Array|Optional|Array consisting of one or more of the following strings:<br>`copy`: require Copy to be available<br> `cut`: require Cut to be available<br>`paste`: require Paste to be available<br>`formatting`: Require the text to be in a text field with formatting ability (bold, italic etc.). Note: experimental - might not be reliable.<br>`httpurl`: require the text to contain exactly one HTTP URL; only the matching part will be passed to the action<br>`email`: require the text to contain exactly one email address ; only the matching part will be passed to the action <br>`path`: require the text to contain exactly one local file path; only the matching part will be passed to the action <br> If this field is omitted, the default is `copy`.|
|`Stay Visible`|Boolean|Optional|If `YES`, the PopClip popup will not disappear after the user clicks the action. Default is `NO`.|
|`Preserve Image Color`|Boolean|Optional|If `YES`, the image file will be draw in its original color, instead of in white.|
|`Pass HTML`|Boolean|Optional|If `YES`, PopClip will pass the selected HTML text (if available) to the extension in the `POPCLIP_HTML` (shell scripts) and `{popclip html}` (AppleScript) fields. Default is `NO`. Leaving this set to `NO` PopClip does not have to process the HTML and this can be slightly faster.|
|`Long Running`|Boolean|Optional|Applies to AppleScript and Shell Script extension only. If `YES`, indicates that the script is expected to be long running. Set this if the script will normally take more than about 0.1 seconds to run, so PopClip knows to show the 'please wait' spinner. |
|`Extension Description`|String OR Dictionary|Optional|A short, human readable description of this extension.|
|`Extension Long Name`|String OR Dictionary|Optional|If `Extension Name` is truncated, you can include a long version of the name here.|
|`Credits`|Array|Optional|An array of dictionaries. Information about the creator(s) of the extension. See [Credits Dictionary](#credits-dictionary).|
|`Apps`|Array|Optional|An array of dictionaries. Information about the app(s) this extension works with. See [Apps Dictionary](#apps-dictionary).|
|`Required OS Version`|String|Optional|Minimum version number of Mac OS X needed for this extension to work. For example `10.8.2`.|
|`Required Software Version`|Number|Optional|Minimum bundle version number of PopClip needed for this extension to work. For example `693` for PopClip 1.4.4.|
|`Actions`|Array|Required|Array of dictionaries defining the actions for this extension. See [Action Dictionary](#action-dictionary).|
|`Options`|Array|Optional|Array of dictionaries defining the options for this extension, if any. See [Option Dictionary](#option-dictionary).|
|`Options Title`|String OR Dictionary|Optional|Title to appear at the top of the options window. Default is `Options for this extension.`.|

### Action Dictionary
Each action dictionary has the following structure. Exactly **one** of `Service Name`, `AppleScript File`, `Shell Script File`, `URL` or `Key Combo` should be specified.

|Key|Type|Required?|Description|
|---|----|---------|-----------|
|`Title`|String OR Dictionary|Required|Format is as for `Extension Name` above. Note that every action must have a title, even if it is never displayed.|
|`Image File`|String|Optional| File name of the icon for this action in PopClip. The icon file must be contained in the extension package. If you omit this field, the `Title` will be displayed instead. See [Icons](#icons) for required icon format. |
|`Service Name`|String|Required for Service actions|Exact name of the OS X service to call (as shown in the Services menu). For example, `Make Sticky`.|
|`AppleScript File`|String|Required for AppleScript actions|The name of the AppleScript file to use. The file must exist in the extension's package. The script must be a plain text file (save as `.applescript`, not `.scpt`) and it must be saved using UTF-8 encoding. Within the script, use `"{popclip text}"` as the placeholder for the selected text. Other fields are also available: see [Script Fields](#script-fields). See also [Example AppleScript File](#example-applescript-file).|
|`Shell Script File`|String|Required for Shell Script actions|The name of the shell script file to invoke. The file must exist in the extension's package. This will be passed as the parameter to `/bin/sh`. Within the script, use the environment variable `$POPCLIP_TEXT` to access the selected text. Other variables are also available: see [Script Fields](#script-fields). The current working directory will be set to the package directory. See also [Example Shell Script File](#example-shell-script-file).|
|`Script Interpreter`|String|Optional|Specify the interpreter to use for the script specified in `Shell Script File`. The default is `/bin/sh` but you could use, for example, `/usr/bin/ruby`.
|`URL`|String|Required for URL actions|The URL to open when the user clicks the action. Use `{popclip text}` as placeholder. For example, `http://translate.google.com/#auto%7Cauto%7C{popclip text}`. Any `&` characters must be XML-encoded as `&amp;`.|
|`Key Combo`|Dictionary|Required for Keypress actions|Specified the keypress which will be generated by PopClip. See [Key Code format](#key-code-format).|
|`Before`|String|Optional|String to indicate an action PopClip should take *before* performing the main action. One of: `copy`, `cut`, `paste` or `paste-plain`. This is used, for example, in the 'Paste and Enter' extension.|
|`After`|String|Optional|String to indicate an action PopClip should take *after* performing the main action. One of: `copy`, `cut`, `paste`, `paste-plain`, `paste-result`, `copy-result`, `show-result` or `popclip-appear`. See [Script Returning Result](#script-returning-result) for usage of `paste-result`, `copy-result` and `show-result`. The `popclip-appear` value makes PopClip invoke itself again (this is used in the Select All extension).|
|`Blocked Apps`|Array|Optional|As above; this value overrides the value specified in the extension header. |
|`Required Apps`|Array|Optional|As above; this value overrides the value specified in the extension header. |
|`Regular Expression`|String|Optional|As above; this value overrides the value specified in the extension header.|
|`Requirements`|Array|Optional|As above; this value overrides the value specified in the extension header. |
|`Stay Visible`|Boolean|Optional|As above; this value overrides the value specified in the extension header.|
|`Preserve Image Color`|Boolean|Optional|As above; this value overrides the value specified in the extension header.|
|`Pass HTML`|Boolean|Optional|As above; this value overrides the value specified in the extension header.|
|`Long Running`|Boolean|Optional|As above; this value overrides the value specified in the extension header.|


### Option Dictionary

Options are presented to the user in a preferences window and are saved by PopClip's preferences on behalf of the extension. Each option dictionary has the following structure.

|Key|Type|Required?|Description|
|---|----|---------|-----------|
|`Option Identifier`|String|Required|Unique identifying string for this option. **It must be an all-lowercase string.** This field is used to pass the option to your script. (See [Script Fields](#script-fields)|
|`Option Type`|String|Required|One of the following: `string` (text box for free text entry), `boolean` (a check box) or `multiple` (pop-up box with multiple choice options)|
|`Option Label`|String OR Dictionary|Required|Label to appear in the user interface for this option.|
|`Option Default Value`|String|Optional|For `string`, `boolean` and `multi` types, this field specified the default value of the option.|
|`Option Values`|Array|Required for `multiple` type|Array of Strings representing the possible values to show in the pop-up button.|


### Script Fields

These strings are available in Shell Script and AppleScript extensions. Where no value is available, the field will be set to an empty string.

|Shell Script Variable|AppleScript Field|Description|
|---------------------|-----------------|-----------|
|`POPCLIP_TEXT`|`{popclip text}`|The selected text, without formatting.|
|`POPCLIP_URLENCODED_TEXT`|`{popclip urlencoded text}`|URL-encoded form of the selected text. For example, if the selected text is `push / pull` this field will contain `push%20%2F%20pull`.|
|`POPCLIP_HTML`|`{popclip html}`|The selected text in HTML format, if available. The `Pass HTML` field must be set to `YES` to receive this field.|
|`POPCLIP_MODIFIER_FLAGS`|`{popclip modifier flags}`|Modifier flags for the keys held down when the extension's button was clicked in PopClip. Values are as defined in [Key Code format](#key-code-format). For example, `0` for no modifiers, or `131072` if shift is held down.|
|`POPCLIP_BUNDLE_IDENTIFIER`|`{popclip bundle identifier}`|Bundle identifier of the app the text was selected in. For example, `com.apple.Safari`.|
|`POPCLIP_APP_NAME`|`{popclip app name}`|Name of the app the text was selected in. For example, `Safari`.|
|`POPCLIP_SELECTED_URL`|`{popclip selected url}`|If the selected text is a single URL, this field will contain the full form of the URL. URLs without protocol prefix are treated as http. For example, if the selected text is `pilotmoon.com` then this field will be `http://pilotmoon.com`.|
|`POPCLIP_BROWSER_TITLE`|`{popclip browser title}`|The title of the web page that the text was selected from. (Safari and Chrome only.)|
|`POPCLIP_BROWSER_URL`|`{popclip browser url}`|The URL of the web page that the text was selected from. (Safari and Chrome only.)|
|`POPCLIP_OPTION_*` *(all UPPERCASE)*|`{popclip option *}` *(all lowercase)*|One such value is generated for each option specified in `Options`, where `*` represents the `Option Identifier`. For boolean options, the value with be a string, either `0` or `1`.|

### Credits Dictionary

|Key|Type|Required?|Description|
|---|----|---------|-----------|
|`Name`|String|Required|Name or identifier of the contributor. For example `John Smith`.|
|`Link`|String|Optional|A link to the contributor's website or other URL. For example `http://johnsmith.com`|

### Apps Dictionary

|Key|Type|Required?|Description|
|---|----|---------|-----------|
|`Name`|String|Required|Name of an app which this extension interacts with. For example `Evernote` for an Evernote extension.|
|`Check Installed`|Boolean|Optional|If `YES`, PopClip will check whether the app given by `Bundle Identifier` is installed when the user tries to use the extension. If missing, PopClip will show a message and a link to the website given in `Link`. Default is `NO`.|
|`Link`|String|Required if `Check Installed` is `YES`|Link to a website where the user can get the app referred to in `Name`. For example `http://evernote.com`.|
|`Bundle Identifier`|String|Required if `Check Installed` is `YES`|Bundle identifier of the application. For example `com.evernote.Evernote`.|

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

Scripts can return results if they specify one of these keys in the Action's `After` field:

|Key|Behaviour|
|---|---------|
|`copy-result`|PopClip will copy the returned text to the clipboard, and briefly display a 'Copied' graphic to the user.|
|`paste-result`|If 'Paste' is available in the current app, PopClip will paste the returned text, replacing the current selection. Otherwise, it will behave as for `copy-result`.|
|`show-result`|PopClip will graphically indicate the success or failure of the script. If the script returns a string, display the string instead.|

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

