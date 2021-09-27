/**
 * Print a string to the debug console.
 */
 declare function print(text: string) : void

/**
 * `SelectionInterface` defines properties to access the selected text contents.
 */
 declare interface SelectionInterface {

 }

 /**
 * `ContextInterface` defines properties to access the context surrounding the selected text.
 */
  declare interface ContextInterface {

}

 /**
 * `PopClipInterface` defines the methods and properties of the global `popclip` object.
 */
 declare interface PopClipInterface {
    /**
    * A bit field representing the modifier keys held when the action was invoked in PopClip.
    * Constants for the modifiers are given in [[Util]].[[Constant]].
    * 
    * #### Example
    * 
    * ```javascript
    * // test for shift
    * if (popclip.modifierKeys & Util.Constant.MODIFIER_SHIFT) {
    *   ...
    * }
    * 
    * // test for  shift OR option
    * if (popclip.modifierKeys & Util.Constant.MODIFIER_SHIFT|Util.Constant.MODIFIER_OPTION) {
    *   ...
    * }
    * 
    * // test for shift AND option
    * let combo = Util.Constant.MODIFIER_SHIFT|Util.Constant.MODIFIER_OPTION;
    * if ((popclip.modifierKeys & combo) === combo) {
    *   ...
    * }
    * ```
    */
    readonly modifierKeys: number

    pasteText(text: string, restore?: boolean): void;
    copyText(text: string): void;

    /**
     * Simulate a key press by the user. The key press delivered at the current app level, not at the OS level. This means PopClip
     * is not able to trigger global keyboard shortcuts. For example, PopClip can trigger ⌘B for "bold" (or whatever it means in the
     * current app) but not ⌘Tab for "switch app".
     * 
     * Some key code and modifier constants are available in [[Util]].[[Constant]].
     * 
     * [More key codes (StackOverflow)](http://stackoverflow.com/questions/3202629/where-can-i-find-a-list-of-mac-virtual-key-codes)
     * 
     * #### Example
     * 
     * ```js
     * // press the key combo ⌘B
     * popclip.pressKey('B', Util.Constant.MODIFIER_COMMAND)
     * // press the key combo ⌥⌘H
     * popclip.pressKey('H', Util.Constant.MODIFIER_OPTION|Util.Constant.MODIFIER_COMMAND)
     * // press the return key
     * popclip.pressKey(Util.Constant.KEY_RETURN)
     * ```
     * 
     * @param key The key to press. When this parameter is a string, PopClip will look up the key code for the first character in the string,
     * mapped to the current keyboard layout. When this parameter is a number, PopClip will use that exact key code.
     *  
     * @param modifiers A bit mask specifiying the modifier keys, if any.
     * 
     */
    pressKey(key: string | number, modifiers?: number): void
}

/**
 * The global `popclip` object encapsulates the user's current interaction with PopClip and provides methods
 * for the script to perform actions on behalf of the user.
 */
declare var popclip : PopClipInterface

declare interface UtilInterface {

    /**
     * Localize an English string into the current user interface language, if possible.
     * This will work for strings which match an existing string in PopClip's user interface.
     * 
     * @param string The string to localize.
     * @return The localized string, or the original string if no localized version was avaiable.
     */
    localize(string: string): string

    /**
     * The `Constant` property is a container for pre-defined constants.
     */
    readonly Constant: {
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
 * The global object `Util` acts as a container for various utility functions and constants.
 */
declare var Util : UtilInterface

/**
 * `PasteboardInterface` defines a simplified interface to the macOS pasteboard.
 */
declare interface PasteboardInterface {
    /**
     * Get and set the plain text content of the pasteboard. When placing text on the pasteboard this way, PopClip's "Copied" notification will not appear.
     * (Typically, scripts should use [[popclip]].[[copyText]] instead, so that the user gets the "Copied" notification.) 
     * #### Example
     * ```js
     * let x = pasteboard.text;
     * pasteboard.text = "new text";
     * ```
     */
    text: string
}

/**
 * The global `pasteboard` object provides an interface to the current general pasteboard (i.e. the system clipboard).
 */
declare var pasteboard: PasteboardInterface