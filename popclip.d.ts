/* This is a TypeScript definitions file for PopClip's JavaScript interface for extensions. */

/**
 * SelectionInterface defines properties to access the selected text contents.
 */
 declare interface SelectionInterface {

 }

 /**
 * ContextInterface defines properties to access the context surrounding the selected text.
 */
  declare interface ContextInterface {

}

/**
 * Options for the [[pasteText]] and [[pasteItems]] methods.
 */
declare interface PasteOptions {
    /**
     * Whether to restore the original contents of the pasteboard after the paste 
     * operation. Default is `false`.
     */
    restore?: boolean
}

/**
 * Options for the [[openUrl]] method.
 */
 declare interface OpenUrlOptions {
    /**
     * Bundle identifier of the app to open the URL with. For example `"com.google.Chrome"`.     
     */
    app?: string
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
    * Constants for the modifiers are given in [[util]].[[constant]]. 
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
     * 
     */
    readonly selection: SelectionInterface

    /**
     * 
     */
    readonly context: ContextInterface

    /**
     * 
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
     * @param options Options for this method
     * 
     * @category Copy/Paste
     */
    pasteText(text: string, options?: PasteOptions): void;


    /**
     * Places the given string on the pasteboard, and shows "Copied" notificaction to the user.
     * @param text The plain text string to copy
     * @category Copy/Paste
     */
    copyText(text: string): void;

    /**
     * Simulate a key press by the user. 
     * 
     * #### Notes
     * 
     * The key press delivered at the current app level, not at the OS level. This means PopClip
     * is not able to trigger global keyboard shortcuts. For example, PopClip can trigger ⌘B for "bold" (or whatever it means in the
     * current app) but not ⌘Tab for "switch app".
     * 
     * Some key code and modifier constants are available in [[util]].[[constant]].
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
     * #### Choice of app to open the URL
     * 
     * If a target application bundle identifier is specified via the `app` option, PopClip will ask that app to open the URL.
     * 
     * If no target app is specified:
     * 
     * * If the URL has the http or https scheme, and the current app is a browser, the the URL is opened in the current app.
     * * Otherwise, PopClip asks macOS to open the URL in the most suitable app (which will be the default browser in the case of web URLs).
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
     * @param options Options for this method
     * @category Action
     */
    openUrl(url: string, options?: OpenUrlOptions): void
}

/**
 * The global `popclip` object encapsulates the user's current interaction with PopClip, and provides methods
 * for performing various actions. It implements [[PopClipInterface]].
 */
declare var popclip : PopClipInterface

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
     * Also available as a global function.
     */
    print(text: string) : void

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
        readonly MODIFIER_SHIFT:         131072
        /**
         * Bit mask for the Control (⌃) key.
         */
        readonly MODIFIER_CONTROL:       262144
        /**
         * Bit mask for the Option (⌥) key.
         */
        readonly MODIFIER_OPTION:        524288
        /**
         * Bit mask for the Command (⌘) key.
         */
        readonly MODIFIER_COMMAND:       1048576
        /**
         * Key code for the Return (↵) key.
         */
        readonly KEY_RETURN:             0X24
        /**
         * Key code for the Tab (⇥) key.
         */
        readonly KEY_TAB:                0X30
        /**
         * Key code for the space bar.
         */
        readonly KEY_SPACE:              0X31
        /**
         * Key code for the Delete (⌫) key.
         */
        readonly KEY_DELETE:             0X33
        /**
         * Key code for the Escape key.
         */
        readonly KEY_ESCAPE:             0X35
        /**
         * Key code for the Forward Delete (⌦) key.
         */
        readonly KEY_FORWARDDELETE:      0X75
        /**
         * Key code for the Left Arrow key.
         */
        readonly KEY_LEFTARROW:          0X7B
        /**
         * Key code for the Right Arrow key.
         */
        readonly KEY_RIGHTARROW:         0X7C
        /**
         * Key code for the Down Arrow key.
         */
        readonly KEY_DOWNARROW:          0X7D
        /**
         * Key code for the Up Arrow key.
         */
        readonly KEY_UPARROW:            0X7E
    }
}

/** 
 * The global `util` object acts as a container for various utility functions and constants. It implements [[UtilInterface]].
 */
declare var util : UtilInterface

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