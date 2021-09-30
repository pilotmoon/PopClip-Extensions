/* This is a TypeScript definitions file for PopClip's JavaScript interface for extensions. */

/**
 * A type to represent a localizable string.
 * 
 * #### Notes
 * 
 * The value may be either a string or an object.
 * If you supply a string, that string is used.
 * If you supply an object mapping language codes to strings, PopClip will
 * display the string for the user's preferred language if possible, with fallback to the `en` string.
 * 
 * #### Example
 * ```js
 * option.label = "Color" // just use this string
 * option.label = { en: "Color", "en-GB": "Colour", fr: "Couleur", "zh-Hans": "颜色" }
 */
declare type LocalizableString = string | object

/**
 * A string to declare an icon. Used in [[ExtensionDefinition]] and [[ActionDefinition]].
 * 
 * 
 * Icons may be specified in a few different ways:
 * 
 * * **Image file:** A string with suffix `.png` or `.svg` matching the name of an image file in the extension package. Images must be in either PNG or SVG format.
 * The icons should be square and monochrome, black, on a transparent background. You can use opacity to create shading.
 * PNG icons should be at least 256x256 pixels in size. 
 *
 * * **SF Symbol:** A string of the form `symbol:<symbol name>` specifies an [SF Symbols](https://sfsymbols.com) name, for example `symbol:flame`.
 * Symbols are available starting on macOS 11.0 and above, but some symbols require higher macOS versions, as indicated in the
 * "Availability" panel in Apple's SF Symbols browser app.
 * 
 * * **Text icon:** A string of the form `text:<text icon specifier>` instructs PopClip to generate a text-based icon, as described below.
 * 
 * ### Text icons
 * 
 * Text-based icons can up to three characters, on their own or within an enclosing shape. The enclosing shape is specified using different kinds of brackets around the text. The easiest way to explain is probably by example:
 * 
 * * `text:A` - the letter A on its own
 * 
 * * `text:(1)` - the digit 1 in an outline circle
 * 
 * * `text:((本))` - the character 本 in a filled circle
 * 
 * * `text:[xyz]` - the characters xyz in an outline square
 * 
 * * `text:[[!]]` - the character ! in a filled square
 * 
 */
declare type IconString = string

/**
 * An action function is called when the user clicks the action button in PopClip.
 * 
 * TODO
 */
 declare type ActionFunction = (selection: SelectionInterface, context: ContextInterface, options: object, modifierKeys: number) => void

 /**
  * An action can be either an [[ActionFunction]] on its own, or an [[ActionDefinition]] object.
  * 
  * If you supply the function on its own, the action will take its name and icon from the extension name and extension icon.
  */
 declare type Action = ActionDefinition | ActionFunction

/**
 * The main object defining a PopClip extension.
 * 
 * You create this in the Config.js and pass it to the [[define]] function.
 * 
 * Any omitted properties (apart from [[actions]]) fall back to the equivalent value in the Config.json file.
 * 
 * @category Extension Definition
 */
declare interface ExtensionDefinition {

    /**
     * A unique identifying string for this extension.
     * 
     * #### Notes
     * 
     * I suggest using a reverse DNS-style identifier. For example `com.example.myextension`.
     * 
     * If you don't have your own domain name, you can use anything you like — it doesn't matter, as long as it is unique.
     * 
     * Do not use the `com.pilotmoon.` prefix for your own extension.
     * 
     * If omitted here, it must be defined in the Config.json file instead.
     */
    identifier?: string

    /**
     * The display name of this extension.
     * 
     * If omitted here, it must be defined in the Config.json file instead.
     */
    name?: LocalizableString

    /**
     * The extension's icon. See [[IconString]].
     */
    icon?: IconString

    /**
     * User-configurable options for this extension.    
     */
    options?: OptionDefinition[]

    /**
     * Define the actions to go in PopClip's popup.
     * 
     * #### Notes
     * 
     * This is called by PopClip when the user has either selected some text, or performed a long press to show PopClip with
     * no selection. At this point, PopClip wants to show its popup and is asking the extension what actions to include.
     * 
     * @returns A single action or array of actions.
     */
    actions: (selection: SelectionInterface, context: ContextInterface, options: object) => Action | Action[]
}

/**
 * An an object you create to define single extension option.
 * Options are defined in the [[options]] array of the extension object.
 * 
 * @category Extension Definition
 */
declare interface OptionDefinition {
    /**
     * An identifying string for this option. 
     */
    identifier: string

    /**
     * The kind of option, one of:
     *  * `string`: a text box for free text entry,
     *  * `boolean`: a check box,
     *  * `multiple`: multiple-choice drop-down with predefined options,
     *  * `password`: a password entry field (passwords are stored in user's keychain instead of preferences),
     *  * `heading`: adds a heading in the user interface, but does not actually define an option
     */
    type: "string" | "boolean" | "multiple" | "password" | "heading"

    /**
     * The label for this option.
     */
    label: LocalizableString

    /**
     * The default value of the option. If ommitted, `string` options default to the empty string,
     * `boolean` options default to true, and `multiple` options default to the top item in the list.
     * A `password` field may not have a default value.
     */
    defaultValue?: string | boolean

    /**
     * An icon for this option. It is only displayed for boolean options, next to the check box. See [[IconString]].
     */
    icon?: IconString
}

/**
 * An object you create to encapsulate an action's code together with an title and/or icon.
 * 
 * @category Extension Definition
 */
 declare interface ActionDefinition {
     /**
      * The action's title. The title is displayed in the action button if there is no icon.
      * For extensions with icons, the title is displayed in the tooltip.
      * 
      * If omitted, the extension's [[name]] will be used, if any.
     */
     title?: LocalizableString
     
     /** 
      * A string to define the action's icon. See [[IconString]].
      * 
      * If `undefined`, the extension's {@link ExtensionDefinition.icon | icon} will be used, if it has one.
      * Setting to `null` explicitly sets the action to have no icon.
      */
     icon?: IconString

     /** The action's code. */
     code: ActionFunction
 }

/**
 * SelectionInterface defines properties to access the selected text contents.
 */
declare interface SelectionInterface {
    /**
     * The plain text selected by the user. If there is no selected text, perhaps because the user invoked PopClip by a long press,
     * this will be the empty string.
     */
    text: string
}

/**
* ContextInterface defines properties to access the context surrounding the selected text.
*/
declare interface ContextInterface {
    /**
     * Does the text area support formatting?
     * 
     * PopClip can't always detect whether the text area supports formatting or not, in which case
     * it will err on the side of a false positive.
     */
    hasFormatting: boolean

    /**
     * This property is true iff the Paste command is enabled in the current app.
     */
    canPaste: boolean

    /**
     * This property is true iff text was selected.
     */
    canCopy: boolean

    /**
     * This property is true iff text was selected and the app's Cut command is enabled.
     */
    canCut: boolean
}

/**
* PopClipInterface defines the methods and properties of the global [[`popclip`]] object.
* 
* Methods in the **Action Methods** category are only available in the action function. If called from
* the population function, the method will throw an exception.
* 
*/
declare interface PopClipInterface {
    /**
    * A bit field representing state of the modifier keys when the action was invoked in PopClip.
    * 
    * #### Notes
    * 
    * Constants for the modifiers are given in {@link UtilInterface.constant | util.constant}. 
    * 
    * During the execution of the population function, the value of this property is always zero.
    * 
    * #### Example
    * 
    * ```javascript
    * // test for shift
    * if (popclip.modifierKeys & util.constant.MODIFIER_SHIFT) {
    *   ...
    * }
    * 
    * // test for shift OR option
    * let combo = util.constant.MODIFIER_SHIFT|util.constant.MODIFIER_OPTION;
    * if (popclip.modifierKeys & combo) { 
    *   ...
    * }
    * 
    * // test for shift AND option
    * if ((popclip.modifierKeys & combo) === combo) {
    *   ...
    * }
    * ```
    */
    readonly modifierKeys: number

    /**
     * The current selection.
     */
    readonly selection: SelectionInterface

    /**
     * The current context around the selection.
     */
    readonly context: ContextInterface

    /**
     * The current values of the options.
     */
    readonly options: object

    /**
     * If the target app's Paste command is available, this method places the given string on the pasteboard
     * and then invokes the target app's Paste comand. If the `restore` flag is set in the options, it will
     * then restore the original pasteboard contents.
     * 
     * If the target app's Paste command is not available, it behaves as [[copyText]] instead.
     * 
     * #### Example
     * 
     * ```js
     * // place "Hello" on the clipboard and invoke Paste
     * popclip.pasteText("Hello");
     * // place "Hello", then restore the original pasteboard contents
     * popclip.pasteText("Hello", {restore: true});
     * ```
     * @param text The plain text string to paste
     * @param options
     * 
     * @category Copy/Paste
     */
    pasteText(text: string, options?: {
        /**
         * Whether to restore the original contents of the pasteboard after the paste 
         * operation. Default is `false`.
         */
        restore?: boolean
    }): void;


    /**
     * Places the given string on the pasteboard, and shows "Copied" notificaction to the user.
     * @param text The plain text string to copy
     * @category Copy/Paste
     */
    copyText(text: string): void;

    /**
     * Strips everything except plain text from the pasteboard, and then invokes [[performPaste]].
     */
    pastePlain(): void;

    /**
     * Invokes the app's Paste command, as if the user pressed ⌘V.
     */
    performPaste(): void;

    /**
     * Simulate a key press by the user. 
     * 
     * #### Notes
     * 
     * The key press delivered at the current app level, not at the OS level. This means PopClip
     * is not able to trigger global keyboard shortcuts. For example, PopClip can trigger ⌘B for "bold" (or whatever it means in the
     * current app) but not ⌘Tab for "switch app".
     * 
     * Some key code and modifier constants are available in {@link UtilInterface.constant | util.constant}.
     * 
     * [More key codes (StackOverflow)](http://stackoverflow.com/questions/3202629/where-can-i-find-a-list-of-mac-virtual-key-codes)
     * 
     * #### Example
     * 
     * ```js
     * // press the key combo ⌘B
     * popclip.pressKey('B', util.constant.MODIFIER_COMMAND);
     * // press the key combo ⌥⌘H
     * popclip.pressKey('H', util.constant.MODIFIER_OPTION|util.constant.MODIFIER_COMMAND);
     * // press the return key
     * popclip.pressKey(util.constant.KEY_RETURN);
     * ```
     * 
     * @param key The key to press. When this parameter is a string, PopClip will look up the key code for the first character in the string,
     * mapped to the current keyboard layout. When this parameter is a number, PopClip will use that exact key code.
     *  
     * @param modifiers A bit mask specifiying the modifier keys, if any.
     * @category Action
     */
    pressKey(key: string | number, modifiers?: number): void


    /**
     * Open a URL in an application.
     * 
     * #### Choice of application
     * 
     * If a target application bundle identifier is specified via the `app` option, PopClip will ask that app to open the URL.
     * 
     * If no target app is specified:
     * 
     * * If the URL has the http or https scheme, and the current app is a browser, the URL is opened in the current app.
     * * Otherwise, PopClip asks macOS to open the URL in the default handler for that URL type.
     * 
     * #### URL encoding
     * 
     * Any parameters etc. in the URL must be appropriately percent-encoded. JavaScript provides the
     * [encodeURIComponent()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
     * function for this.
     * 
     * #### Example
     * ```js
     * popclip.openUrl("https://xkcd.com"); // open xckd.com in current/default browser
     * popclip.openUrl("https://xkcd.com", {app: "com.brave.Browser"}); // open xkcd.com in Brave browser
     * popclip.openUrl(`mailto:support@pilotmoon.com?subject=${encodeURIComponent("What's up?")}`); // open mailto link in the default mail application
     * ```
     * 
     * @param url A well-formed URL
     * @param options
     * @category Action
     */
    openUrl(url: string, options?: {
        /**
         * Bundle identifier of the app to open the URL with. For example `"com.google.Chrome"`.     
         */
        app?: string
    }): void
}

/**
 * The global `popclip` object encapsulates the user's current interaction with PopClip, and provides methods
 * for performing various actions. It implements [[PopClipInterface]].
 */
declare var popclip: PopClipInterface

/**
* Interface definition for the global [[`util`]] object. Some of the methods are also available as global functions, where indicated.
*/
declare interface UtilInterface {

    /**
     * Print a string for debugging purposes. By default it not output anywhere,  but
     * you can configure PopClip to output to the Console app by running the following command in Terminal:
     * 
     * `defaults write com.pilotmoon.popclip EnableExtensionDebug -bool YES`
     * 
     */
    log(text: string): void

    /**
     * Localize an English string into the current user interface language, if possible.
     * This will work for strings which match an existing string in PopClip's user interface.
     * 
     * @param string The string to localize.
     * @return The localized string, or the original string if no localized version was avaiable.
     */
    localize(string: string): string

    /**
     * The `constant` property is a container for pre-defined constants.
     */
    readonly constant: {
        /**
         * Bit mask for the Shift (⇧) key.
         */
        readonly MODIFIER_SHIFT: 131072
        /**
         * Bit mask for the Control (⌃) key.
         */
        readonly MODIFIER_CONTROL: 262144
        /**
         * Bit mask for the Option (⌥) key.
         */
        readonly MODIFIER_OPTION: 524288
        /**
         * Bit mask for the Command (⌘) key.
         */
        readonly MODIFIER_COMMAND: 1048576
        /**
         * Key code for the Return (↵) key.
         */
        readonly KEY_RETURN: 0X24
        /**
         * Key code for the Tab (⇥) key.
         */
        readonly KEY_TAB: 0X30
        /**
         * Key code for the space bar.
         */
        readonly KEY_SPACE: 0X31
        /**
         * Key code for the Delete (⌫) key.
         */
        readonly KEY_DELETE: 0X33
        /**
         * Key code for the Escape key.
         */
        readonly KEY_ESCAPE: 0X35
        /**
         * Key code for the Forward Delete (⌦) key.
         */
        readonly KEY_FORWARDDELETE: 0X75
        /**
         * Key code for the Left Arrow key.
         */
        readonly KEY_LEFTARROW: 0X7B
        /**
         * Key code for the Right Arrow key.
         */
        readonly KEY_RIGHTARROW: 0X7C
        /**
         * Key code for the Down Arrow key.
         */
        readonly KEY_DOWNARROW: 0X7D
        /**
         * Key code for the Up Arrow key.
         */
        readonly KEY_UPARROW: 0X7E
    }
}

/** 
 * The global `util` object acts as a container for various utility functions and constants. It implements [[UtilInterface]].
 */
declare var util: UtilInterface

/**
 * A simplified interface to the macOS pasteboard. Implemented by the global object, [[`pasteboard`]].
 */
declare interface PasteboardInterface {
    /**
     * Get and set the plain text content of the pasteboard. 
     * 
     * #### Notes
     * This property corresponds with the pasteboard type `public.utf8-plain-text`. 
     * 
     * When placing text on the pasteboard this way, PopClip's "Copied" notification will not appear.
     * (Typically, scripts should use [[copyText]] instead, so that the user gets the "Copied" notification.) 
     * 
     * The value of this property will always be a string. If there is no plain text value on the
     * pasteboard, reading this property will give an empty string (`""`). 
     * 
     * #### Example
     * ```js
     * let x = pasteboard.text;
     * pasteboard.text = "new text";
     * ```
     */
    text: string
}

/**
 * The global `pasteboard` object provides access to the contents of the macOS general pasteboard (i.e. the system clipboard). It implements [[PasteboardInterface]].
 */
declare var pasteboard: PasteboardInterface

/**
 * Export an object for use by another file.
 * 
 * #### Notes
 * 
 * The _define_ function exports an arbitrary object, which other files can  import using [[require]].
 *
 * It should be called only once in any file; if it is called more than once, only the 
 * final call will have any effect.
 * 
 * It is used in the extension's Config.js file to define the extension itself.
 * 
 * #### Example
 * ```js
 * // greetings.js
 * function hello(name) {    
 *   util.log("Hello, ${name}!");    
 * })
 * function goodbye(name) {    
 *   util.log("Bye, ${name}!");    
 * })
 * // export these two functions. hey, we made a module!
 * define({hello, goodbye});
 * ``` 
 *
 * @param objectOrFactory Either the object to be defined, or a factory function which returns the object to be defined.
 */
 declare function define(objectOrFactory: object | (() => object)): void

 /**
  * Import an object from another file.
  *  
  * #### Example
  * 
  * ```js
  * // load the functions from the greeting.js file
  * const greetings = require('greetings.js');
  * print(greetings.hello("PopClip")) // Hello, Popclip!
  * 
  * // alternative using destructuring assignment
  * const {hello, goodbye} = require('greetings.js');
  * print(goodbye("PopClip")) // Bye, Popclip!
  * ``` 
  * 
  * @param file Path to the file, relative to the root folder of the extension.
  * @return The imported object.
  */
 declare function require(file: string): object