/*
This is a TypeScript definitions file for PopClip's JavaScript interface.
This file lets TypeScript-aware editors provide auto-complete and
syntax checking for both JavaScript and TypeScript code.
*/

/**
 * An object mapping language codes to strings. See [[LocalizableString]].
 *
 * #### Notes
 *
 * An `en` string is required, as the default fallback, and it should usually
 * contain a string in US English. _(That's the macOS default,
 * as a Brit this of course pains me! -Nick)_
 *
 * The predefined languages in this interface definition are the ones that
 * PopClip currently ships with translations for.
 * But you can include other languages too.
 * For example you can include `en-GB` or `en-CA` string to have different
 * regional spellings.
 */
declare interface StringTable {
  /** English (US) language string. */
  en: string
  /** Danish language string. */
  da?: string
  /** German language string. */
  de?: string
  /** Spanish language string. */
  es?: string
  /** French language string. */
  fr?: string
  /** Italian language string. */
  it?: string
  /** Japanese language string. */
  ja?: string
  /** Korean language string. */
  ko?: string
  /** Dutch language string. */
  nl?: string
  /** Brazilian Portuguese language string. */
  'pt-BR'?: string
  /** Russian language string. */
  ru?: string
  /** Vietnamese language string. */
  vi?: string
  /** Simplified Chinese language string. */
  'zh-Hans'?: string
  /** Traditional Chinese language string. */
  'zh-Hant'?: string
  /** Any other strings. */
  [code: string]: string
}

/**
 * A type to represent a localizable string.
 *
 * #### Notes
 *
 * The value may be either a string or an object.
 * If you supply a string, that string is used.
 * If you supply a [[StringTable]] object, PopClip will
 * display the string for the user's preferred language if possible, with fallback to the `en` string.
 *
 * #### Example
 * ```js
 * option.label = "Color" // just use this string
 * option.label = { en: "Color", "en-GB": "Colour", fr: "Couleur", "zh-Hans": "颜色" }
 */
declare type LocalizableString = string | StringTable

/**
 * A string with a special format to declare an icon. Used for {@link Extension.icon} and {@link Action.icon}.
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
 * Represents the state of the four modifier keys. The value is true when the key is held down.
 * See {@link PopClip.modifiers}.
 */
declare interface Modifiers {
  /** Shift (⇧) key state. */
  shift: boolean
  /** Control (⌃) key state. */
  control: boolean
  /** Option (⌥) key state. */
  option: boolean
  /** Command (⌘) key state. */
  command: boolean
}

/**
  * A requirement is specified in the {@link Action.requirements} array as a string.
  * The possible strings are:
  *
  * | Specifier     | Condition                                                  |
  * |---------------|------------------------------------------------------------|
  * |`text`|One or more characters of text must be selected. |
  * |`copy`| A synonym for `text`, for backwards compatibility.|
  * |`cut`| Text must be selected and the app's Cut command must be available.|
  * |`paste`|The app's Paste command must be available.|
  * |`httpurl`|The text must contain exactly one web URL (http or https).|
  * |`httpurls`|The text must contain one or more web URLs.|
  * |`email`|The text must contain exactly one email address.|
  * |`path`|The text must be a local file path, and it must exist on the local file system.|
  * |`formatting`|The selected text control must support formatting. (PopClip makes its best guess about this, erring on the side of a false positive.)|
  * |`option-foo=bar`|The current value of the option named `foo` must be equal to the string `bar`. (Boolean values match against strings `0` and `1`.)|
  *
  * A requirement can also be **negated** by prefixing `!`, to specify that the requirement must _not_ be met.
  *
  * #### Example
  * ```js
  * ["paste", "!httpurls", "option-goFishing=1", "!app=com.apple.Safari"]
  * ```
  */
 declare type Requirement =
 | 'text' | 'copy' | 'cut' | 'paste' | 'formatting' | 'httpurl' | 'httpurls' | 'email' | 'path'
 | `option-${string}=${string}`

 /** Negated form of [[Requirement]]. */
 declare type NegatedRequirement = `!${Requirement}`

/**
 * Declares information about an app or website that this extension interacts with.
 */
declare interface AssociatedApp {
  /** Name of the app. Fo example "Scrivener" */
  name: string

  /**
   * Web page where user can obtain the app, e.g. "https://www.literatureandlatte.com/scrivener".
   *
   * PopClip will link to this page if the "missing app" dialog is shown. The link is also used
   * this in the online extension listing.
   */
  link: string

  /**
   * Indicates whether PopClip should check for the presence of the app on the computer. If not found,
   * PopCLip will display a message prompting the user to install the app. Default is no. Not applicable for websites.
   */
  checkInstalled?: boolean

  /**
   * List of possible bundle identifiers of this app.
   *
   * PopCLip uses this list when checking for the presence of the app. Include here all application variants
   * that work with this extension. In the simplest case there may
   * be just one bundle ID, but an app may have alternative bundle IDs such as for free/pro variants,
   * an App Store version, a stand-alone version, a Setapp version, and so on.
   */
  bundleIdentifiers?: string[]
}

/**
 * The action function is called when the user clicks the action button in PopClip. This is where
 * the extension does its main work.
 * @param selection The selected text and related properties. (Same object as [[PopClip.selection]].)
 * @param context Information about the context surrounding the selection. (Same object as [[PopClip.context]].)
 * @param options Current values of the options for this extension. (Same object as [[PopClip.options]].)
 * @param modifiers Modifier keys held down when the action was invoked. (Same object as [[PopClip.modifiers]].)
 */
 declare type ActionFunction = (selection: Selection, context: Context, options: Options, modifiers: Modifiers) => void

 /**
  * Either an [[ActionFunction]] on its own, or an [[Action]] object.
  *
  * If you supply the function on its own, the action will take its name and icon from the extension name and extension icon.
  */
 declare type ActionType = Action | ActionFunction

/**
 * Used in the {@link Extension.flags} and {@link Action.flags} to define certain boolean properties of actions.
 * @category Definition
 */
declare interface ActionFlags {
  /**
   * Whether PopClip will capture HTML and Markdown content for the selection. Default is no.
   *
   * #### Notes
   * The HTML can be accessed in the [[Selection.html]] property, and the Markdown
   * can be accessed in the [[Selection.markdown]] property.
   *
   * If the selection is not HTML-backed, PopClip will generate HTML from any available RTF or plain text
   * content.
   */
  captureHtml?: boolean
  /**
   * Whether PopClip will capture RTF (Rich Text Format) content for the selection. Default is no.
   *
   * #### Notes
   * Captured RTF can be accessed in the [[Selection.items]] property under the `public.rtf` key.
   */
  captureRtf?: boolean
  /** Whether PopClip's popup should stay on screen after clicking this action's button. Default is no.
   *
   * #### Notes
   * An example of this in use is the Formatting extension.
   */
  stayVisible?: boolean

  /**
   * Whether the action's icon should be displayed in its orignal color rather than monochrome.
   */
  preserveColor?: boolean
}

/**
 * Encapsulates an action's code, title, icon and other properties.
 *
 * @category Definition
 */
declare interface Action {
  /**
     * The action's title. The title is displayed in the action button if there is no icon.
     * For extensions with icons, the title is displayed in the tooltip.
     *
     * If no title is defined here, the extension's [[name]] will be used, if any.
    */
  title?: LocalizableString

  /**
     * A string to define the action's icon. See [[IconString]].
     *
     * If no icon is defined here, the extension's {@link Extension.icon | icon} will be used, if any.
     * Setting to `null` explicitly sets the action to have no icon.
     */
  icon?: IconString | null

  /**
     * Flags control aspects of this action's behaviour - see [[ActionFlags]]. If not flags object
     * is set, the value of {@link Extension.flags} is used instead, if any.
     */
  flags?: ActionFlags

  /**
     * An array of conditions which must be met for this action to appear — see [[Requirement]].
     *
     * * If no array is specified here, the action takes the value of [[Extension.requirements]].
     * * If no array is specified there either, the action takes the default value `["text"]`.
     *
     * #### Notes
     *
     * When multiple conditions are specified, all of them must be satisfied.
     *
     * An empty array (`[]`) indicates no requirements at all, meaning the action will always appear.
     *
     * This property has no effect on dynamically generated actions.
     *
     * #### Alternatives
     *
     * Instead of using `requirements`, extensions can dynamically generate their
     * actions using a function instead. See {@link Extension.actions}.
     */
  requirements?: Array<Requirement | NegatedRequirement>

  /**
     * Array of bundle identifiers for which the extension should appear. The action will only
     * appear if PopCLip is used in one of the specified apps.
     *
     * #### Alternatives
     *
     * Instead of using `requiredApps`, extensions can dynamically generate their
     * actions using a function instead. See {@link Extension.actions}.
     */
  requiredApps?: string[]

  /**
     * Array of bundle identifiers for which the extension should not appear. The action will not
     * appear if PopClip is used in any of the specified apps.
     *
     #### Alternatives
     *
     * Instead of using `excludedApps`, extensions can dynamically generate their
     * actions using a function instead. See {@link Extension.actions}.
     */
  excludedApps?: string[]

  /**
     * A regular expression to decide whether this action appears in the popup.
     *
     * * If no regex is specified here, the action takes the value of [[Extension.regex]].
     * * If no regex is specified there either, the action will match any input.
     *
     * #### Notes
     *
     * You may express the value either as a
     * [JavaScript regular expression literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
     * (or otherwise constructed `RegExp` object), or as a string.
     *
     * * If you supply a `RegExp` it will be evaluated in the JavaScript engine.
     * * If you supply a string it will be evaluated by macOS natively using the `NSRegularExpression` API (same as for 'classic' PopClip extensions).
     *
     * If the regex matches the selected text, the action will be shown in the popup and
     * the first occurrence of the matched text is accessible later via {@link Selection.matchedText | matchedText}.
     *
     * If there is no match, the action is excluded from the popup.
     *
     * The regex's `lastIndex` is reset before and after each invocation, so the `g` (global) and `y` (sticky) flags have no effect.
     *
     * This property has no effect on dynamically generated actions.
     *
     * #### Alternatives
     *
     * Instead of using a regex, extensions can dynamically generate their
     * actions using a function instead. See {@link Extension.actions}.
     *
     * #### Example
     * ```js
     * regex = /abc/i   // Example regex 'abc' with 'i' (case insensitive) flag
     *                  // Matches abc, ABC, Abc, etc.
     * ```

     */
  regex?: RegExp | string

  /**
   * Declares the application or website associated with this action, if any.
   */
  app?: AssociatedApp

  /**
     * The action's code.
     */
  code: ActionFunction
}

/**
 * The Extension object defines the PopClip extension.
 *
 * You create this in Config.js and export it with `define()`.
 *
 * Any properties omitted from the extension object in Config.js (apart from [[action]] and [[actions]])
 * fall back to the equivalent value in the Config.json file, if it is present.
 *
 *
 * #### Examples
 *
 * *Simple extension* — The following Config.js defines a complete extension:
 *
 * * Config.js
 * ```js
 *   define({
 *     identifier: "com.example.my-extension",
 *     name: "My Extension",
 *     action: function(selection) {
 *       popclip.showText("Your text is: " + selection.text)
 *     }
 *   })
 * ```
 *
 * *Example with Config.json* — The previous example is equivalent to:
 *
 * * Config.json:
 * ```json
 * {
 *     "identifier": "com.example.my-extension",
 *     "name": "My Extension",
 * }
 * ```
 *
 * * Config.js:
 * ```js
 *   define({
 *     action: function(selection) {
 *       popclip.showText("Your text is: " + selection.text)
 *     }
 *   })
 * ```
 *
 *
 * @category Definition
 */
declare interface Extension {

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
    * If omitted, the identifier is taken from the Config.json file, or else auto-generated from the package name.
    *
    */
  identifier?: string

  /**
   * The display name of this extension.
   *
   * If omitted, the name is taken from the Config.json file, or else auto-generated from the package name.
   */
  name?: LocalizableString

  /**
     * The extension's icon. See [[IconString]].
     */
  icon?: IconString | null

  /**
     * Defines the user-configurable options for this extension.
     */
  options?: Option[]

  /**
     * Flags set here will apply to this extension's actions, unless overidden in the action definition.
     * See [[ActionFlags]].
     */
  flags?: ActionFlags

  /**
     * A requirements array set here will apply to all this extension's actions, unless overidden in the action definition.
     * See [[Action.requirements]].
     */
  requirements?: Array<Requirement | NegatedRequirement>

  /**
     * An apps array set here will apply to all this extension's actions, unless overidden in the action definition.
     * See [[Action.requiredApps]].
     */
  requiredApps?: string[]

  /**
     * A regex set here will apply to all this extension's actions, unless overidden in the action definition.
     * See [[Action.excludedApps]].
     */
  excludedApps?: string[]

  /**
     * A regex set here will apply to all this extension's actions, unless overidden in the action definition.
     * See [[Action.regex]].
     */
  regex?: RegExp

  /**
   * An associated app set here will apply to all this extension's actions, unless overidden in the action definition.
   * See [[Action.app]].
   */
  app?: AssociatedApp

  /**
     * Define the actions to go in PopClip's popup. This can be an array or a function.
     *
     * * If it's an array, the supplied actions are used in the popup, subject to meeting the
     * requirements and regex conditions.
     *
     * * If it's a function, it is called by PopClip to dynamically populate the popup with actions from this extension.
     * Setting requirements and regex keys has no effect on dynamic actions — the function itself is responsible for deciding what actions to show.
     *
     * @param selection: The current selected text.
     * @param context: The current context.
     * @param context: The current option values.
     * @returns A single action or array of actions.
     */
  actions?: ActionType[] | ((selection: Selection, context: Context, options: Options) => ActionType | ActionType[] | undefined)

  /**
     * Simplified property to define a single action.
     */
  action?: ActionType
}

/**
 * Defines a single extension option.
 *
 * @category Definition
 */
declare interface Option {
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
  type: 'string' | 'boolean' | 'multiple' | 'password' | 'heading'

  /**
   * A short label for this option.
   */
  label: LocalizableString

  /**
   * An optional longer explanantion of this option, to be shown in the UI.
   */
  description?: LocalizableString

  /**
   * The default value of the option. If ommitted, `string` options default to the empty string,
   * `boolean` options default to true, and `multiple` options default to the top item in the list.
   * A `password` field may not have a default value.
   */
  defaultValue?: string | boolean

  /**
   * The possible values for a `multiple` option.
   */
  values?: string[]

  /**
   * Display names corresponding to the entries in the [[values]] array. These are shown in the option UI.
   * If ommitted, the raw value strings are shown instead.
   */
  valueLabels?: LocalizableString[]

  /**
   * An icon for this option. It is only displayed for boolean options, next to the check box. See [[IconString]].
   */
  icon?: IconString
}

/**
 * Selection defines properties to access the selected text contents.
 */
declare interface Selection {
  /**
     * The plain text selected by the user. If there is no selected text, perhaps because the user invoked PopClip by a long press,
     * this will be the empty string.
     */
  text: string

  /**
     * If the action specified {@link Action.requirements | requirements} or a {@link Action.regex | regex} to match the input, this will be the matching part of the text.
     * Otherwise, it will be the same string as [[text]].
     */
  matchedText: string

  /*
     * If the action specified a {@link Action.regex | regex} to match the input, this will be the full result of the the match.
     *
     * You can use this to access any capture groups from the regex.
     * The value is a return value from JavaScript's [RegExp.prototype.exec()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) method.
     *
     * #### Example
     * ```js
     * // text: "apple", regex: /.(.)/
     * selection.regexResult[0] // "ap" (full match)
     * selection.regexResult[1] // "p" (capture group 1)
     * ```
     */
  regexResult: any

  /**
     * HTML. (docs todo)
     */
  html: string

  /**
     * Markdown. (docs todo)
     */
  markdown: string

  /**
     * Data of various kinds, that PopClip detected in the selected text.
     */
  data: {
    /** HTTP ot HTTPS urls. */
    webUrls: string[]
    /** Other protocols or app urls e.g. ftp:, omnifocus:, craftdocs: etc. (PopClip has a pre-defined allowlist
         * for these "other" URL schemes.) */
    otherUrls: string[]
    /** Email addresses. */
    emails: string[]
    /** A local file path. The file path must be for a directory or file that exists. */
    paths: string[]
  }
}

/**
*  Properties relating the context surrounding the selected text.
*/
declare interface Context {
  /**
     * Indicates whether the text area supports formatting.
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

  /**
   * If the current app is a compatible browser, this will be the page URL.
   */
  browserUrl: string

  /**
   * If the current app is a compatible browser, this will be the page title.
   */
  browserTitle: string

  /**
   * The name of the current app, for example `Drafts`.
   */
  appName: string

  /**
   * The bundle identitifier of the current app, for example `com.agiletortoise.Drafts-OSX`.
   */
  appIdentifier: string
}

/**
 * Represents the current values of the extension's option (that were defined in {@link Extension.options}.
 * It maps option identifier strings to the current option value. See {@link PopClip.options}, {@link Extension.actions}, [[ActionFunction]].
 */
declare interface Options { [identifier: string]: string | boolean }

/**
* PopClip defines the methods and properties of the global [[`popclip`]] object.
*
* Methods in the **Action Methods** category are only available in an action function. If called from
* a population function, the method will throw an exception.
*
*/
declare interface PopClip {
  /**
    * A bit field representing state of the modifier keys when the action was invoked in PopClip.
    *
    * #### Notes
    *
    * Constants for the modifiers are given in {@link Util.constant | util.constant}.
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

  /*
     * (Beta feature)
     * The state of the modifier keys when the action was invoked in PopClip.
     *
     * #### Notes
     * During the execution of the population function, all the modifiers will read as false.
     *
     * #### Example
     * ```js
     * if (popclip.modifiers.shift) {
     *   ...
     * }
     * ```
     *
     */
  readonly modifiers: Modifiers

  /**
     * The current selection.
     */
  readonly selection: Selection

  /**
     * The current context around the selection.
     */
  readonly context: Context

  /**
     * The current values of the options.
     */
  readonly options: Options

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
     * @category Action
     */
  pasteText: (text: string, options?: {
    /**
         * Whether to restore the original contents of the pasteboard after the paste
         * operation. Default is `false`.
         */
    restore?: boolean
  }) => void

  /**
     * Places the given string on the pasteboard, and shows "Copied" notificaction to the user.
     * @param text The plain text string to copy
     * @category Action
     */
  copyText: (text: string) => void

  /**
     * Invokes the app's Paste command, as if the user pressed ⌘V, to paste whatever is already on the pasteboard.
     * @category Action
     */
  performPaste: () => void

  /**
     * Display text inside PopClip's popup, with option to make the display a clickable button to
     * paste the text.
     * @param text The text to display. It will be truncated to 160 characters when shown.
     * @param options
     */
  showText: (text: string, options?: {
  /**
   * If `true`, and the app's Paste command is available, the displayed text will be in a cickable button,
   * which clicked, pastes the full text.
   */
    preview?: boolean
  }) => void

  /**
   * PopClip will show a checkmark symbol to indicate success.
   */
  showSuccess: () => void

  /**
   * PopClip will show an "X" symbol to indicate failure.
   */
  showFailure: () => void

  /**
   * PopClip will open the settings UI for this extension.
   *
   * #### Notes
   * If the extension has no settings, this method does nothing.
   */
  showSettings: () => void

  /**
   * Trigger PopClip to appear again with the current selection.
   */
  appear: () => void

  /**
     * Simulate a key press by the user.
     *
     * #### Notes
     *
     * The key press delivered at the current app level, not at the OS level. This means PopClip
     * is not able to trigger global keyboard shortcuts. For example, PopClip can trigger ⌘B for "bold" (or whatever it means in the
     * current app) but not ⌘Tab for "switch app".
     *
     * Some key code and modifier constants are available in {@link Util.constant | util.constant}.
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
  pressKey: (key: string | number, modifiers?: number) => void

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
  openUrl: (url: string, options?: {
    /**
         * Bundle identifier of the app to open the URL with. For example `"com.google.Chrome"`.
         */
    app?: string
  }) => void
}

/**
 * The global `popclip` object encapsulates the user's current interaction with PopClip, and provides methods
 * for performing various actions. It implements [[PopClip]].
 */
declare var popclip: PopClip

/**
* A container for various utility functions and constants [[`util`]] object.
*/
declare interface Util {

  /**
     * Localize an English string into the current user interface language, if possible.
     * This will work for strings which match an existing string in PopClip's user interface.
     *
     * @param string The string to localize.
     * @return The localized string, or the original string if no localized version was avaiable.
     */
  localize: (string: string) => string

  /**
     * Encode a string as UTF-8 then Base-64 encode the result.
     *
     * @param string The string to encode.
     * @param options
     */
  base64Encode: (string: string, options?: {
    /**
         * Whether to encode using the URL-safe variant, with `-` and `_` substituted for `+` and `/`. Default is no.
         */
    urlSafe?: boolean
    /**
         * Whether to trim the `=`/`==` padding from the string. Default is no.
         */
    trimmed?: boolean
  }) => string

  /**
     * Decode a Base-64 string and interpret the result as a UTF-8 string.
     *
     * Accepts both standard and URL-safe variants as input. Also accepts input with or without the `=`/`==` end padding.
     *
     * @param string
     * @returns The decoded string, or undefined if the input cannot be converted into a UTF-8 string.
     */
  base64Decode: (string: string) => string | undefined

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
 * The global `util` object acts as a container for various utility functions and constants. It implements [[Util]].
 */
declare var util: Util

/**
 * A simplified interface to the macOS pasteboard. Implemented by the global object, [[`pasteboard`]].
 */
declare interface Pasteboard {
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
 * The global `pasteboard` object provides access to the contents of the macOS general pasteboard (i.e. the system clipboard). It implements [[Pasteboard]].
 */
declare var pasteboard: Pasteboard

/**
 * Output a string for debugging purposes. By default it is not output anywhere,  but
 * you can configure PopClip to output to the Console app by running the following command in Terminal:
 *
 * `defaults write com.pilotmoon.popclip EnableExtensionDebug -bool YES`
 *
 * then Quit and restart PopClip.
 *
 * #### Example
 * ```js
 * print("Hello, world!")
 * // print: Hello, world!
 * print(1, Math.PI, 2/3, ['a','b','c'])
 * // print: 1 3.141592653589793 0.6666666666666666 a,b,c
 * ```
 *
 * @param message One or more values, which will be coerced to strings. Multiple parameters will be separated by a space.
 */
declare function print (...items: any[]): void

/*
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
 *   print("Hello, ${name}!");
 * })
 * function goodbye(name) {
 *   print("Bye, ${name}!");
 * })
 * // export these two functions. hey, we made a module!
 * define({hello, goodbye});
 *
 * ```
 *
 * Partially implements AMD protocol.
 * AMD spec: https://github.com/amdjs/amdjs-api/wiki/AMD
 */
declare function define (object: object): void
declare function define (factory: () => object): void
declare function define (dependencies: string[], factory: () => object): void
declare function define (id: string, factory: () => object): void
declare function define (id: string, dependencies: string[], factory: () => object): void

/* declare ambient module + exports for node-style exporting */
declare const module: { exports: any }
declare const exports: any

/**
 * Function called from Config.js to define the extension.
 * @param extension The extension object to pass to PopClip.
 */
declare function defineExtension (extension: Extension): void
/* note that internally, `defineExtension` is just a synonym for `define`, but it's nice to have
 * this simple version for cleaner type checking and it's easier to explain in the docs.
 */

/**
  * Import an object from another file.
  *
  * #### Notes
  * PopClip's `require()` implementation attempts to import from the following module formats:
  *
  * * AMD modules, which use `define(...)`.
  * * Node/CommonJS modules, which use `module.exports = ...` or `exports.name = ...`
  * * TypeScript compiled modules, which use `exports.default = ...`
  *
  * #### Notes
  *
  * Paths beginning with `./` or `../` are resolved relative to the the location of the current file.
  *
  * Otherwise, the path is resolved relative to the extensions's package root.
  * If there is no file in the extension, PopClip will look in its internal module repository.
  *
  * If no file extension is given, PopCLip will try adding the extensions `.js`, `.json` in that order.
  *
  * JSON files are parsed and returned as an object.
  *
  * #### Example
  *
  * ```js
  * // load the functions from the greeting.js file
  * const greetings = require('./greetings.js');
  * print(greetings.hello("PopClip")) // Hello, Popclip!
  *
  * // alternative using destructuring assignment
  * const {hello, goodbye} = require('./greetings.js');
  * print(goodbye("PopClip")) // Bye, Popclip!
  * ```
  *
  * @param file Path to the file to import.
  * @return The imported object.
  */
declare function require (file: string): object

/* Globals */

/**
 * Call a function after a specified time interval.
 *
 * #### Notes
 *
 * This is PopClip's own implementation of the standard
 * [setTimeout](http://developer.mozilla.org/en-US/docs/Web/API/SetTimeout) function,
 * as found in browsers.
 * Ordinarily you shouldn't need to use this. It is is mainly included for
 * compatibility with libraries that might need it.
 *
 * @param callback A function to be called after the timer expires.
 * @param timeout Timeout in milliseconds. If this parameter is omitted, a value of 0 is used,
 * @param args Additional arguments to be passed to the callback function.
 * @returns Numeric identifier for the timer which can be passed to [[clearTimeout]] to cancel it.
 * @category Timer
 */
declare function setTimeout (callback: (...args?: any) => void, timeout?: number, ...args?: any): number

/**
 * Cancels a timeout prevouly created with [[setTimeout]].
 * @param timeoutId Identifier of the timeout to cancel.
 * @category Timer
 */
declare function clearTimeout (timeoutId: number): void
