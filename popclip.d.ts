/*
This is a TypeScript definitions file for PopClip's JavaScript interface.
This file lets TypeScript-aware editors provide auto-complete and
syntax checking for both JavaScript and TypeScript code.

One way to point your editor to this file is to add a line like this to
the top of your JS or TS:
/// <reference path="(...insert path to...)/popclip.d.ts" />
*/

/**
 * An object giving strings for the different languages PopClip supports. See [[LocalizableString]].
 */
declare interface StringTable {
  /** English (US) language string. */
  en: string
  /** English (UK) language string. */
  'en-GB'?: string
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
  /** Polish language string. */
  pl?: string
  /** Brazilian Portuguese language string. */
  'pt-BR'?: string
  /** Russian language string. */
  ru?: string
  /** Slovak language string. */
  sk?: string
  /** Turkish language string. */
  tr?: string
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
 * ```
 */
declare type LocalizableString = string | StringTable

/**
 * Represents the state of the four modifier keys. The value is true when the key is held down
 * at the time the action is invoked.
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
  *
  * #### Example
  * ```js
  * ["paste", "!urls", "option-goFishing=1"]
  * ```
  */
 declare type Requirement =
 | 'text' | 'cut' | 'paste' | 'formatting' | 'url' | 'urls' | 'email' | 'emails' | 'path'
 | `option-${string}=${string}`

 /** Negated form of [[Requirement]]. */
 declare type NegatedRequirement = `!${Requirement}`

 /**
  * Strings which can be used to specify the [[before]] action.
  */
 declare type BeforeStep = 'cut' | 'copy' | 'paste' | 'paste-plain'

 /**
  * Strings which can be used to specify the [[after]] action.
  */
 declare type AfterStep = BeforeStep | 'popclip-appear' | 'show-status' | 'copy-result' | 'paste-result' | 'show-result' | 'preview-result'

/**
 * Declares information about an app or website that this extension interacts with.
 */
declare interface AssociatedApp {
  /**
   * Name of the app. For example "Scrivener"
   */
  name: string

  /**
   * Web page where user can obtain the app, e.g. "https://www.literatureandlatte.com/scrivener".
   */
  link: string

  /**
   * Indicates whether PopClip should check for the presence of the app on the computer. Default is false.
   */
  checkInstalled?: boolean

  /**
   * List of possible bundle identifiers of this app.
   */
  bundleIdentifiers?: string[]
}

/**
 * A population function dynamically generates the actions for the extension. See [[Extension.actions]].
 * @param input The selected text and related properties. (Same object as [[PopClip.selection]].)
 * @param options Current values of the options for this extension. (Same object as [[PopClip.options]].)
 * @param context Information about the context surrounding the selection. (Same object as [[PopClip.context]].)
 * @returns A single action, an array of actions.
 */
declare type PopulationFunction<CustomOptions extends Options = Options> = (input: Input, options: CustomOptions, context: Context) => (Action | ActionFunction)[] | Action | ActionFunction | void


/**
 * Object returned by [[Extension.auth]] when there is an authentication flow to kick off
 */
declare type AuthFlowFunction = (url: string, params?: {[string]: string | undefined}, expect?: string[]) => Promise<any>

/**
 * Credentials used in auth function
 * */
declare interface AuthInfo {
  /** Value of `username` option (will be empty string if none defined) */
  username: string
  /** Value of `password` option (will be empty string if none defined) */
  password: string
  /** An appropriate value to use as the redirection URL in authorization flows for this extension.
   * Example output:
   * `http://localhost:58906/callback/com.pilotmoon.popclip.extension.todoist/auth`
   */
  redirect: string
  /** Extension display name */
  name: string
  /** Extension identifier */
  identifier: string
}

/**
 * Function signature of the [[Extension.auth]] method.
 */
declare type AuthFunction = (info: AuthInfo, flow: AuthFlowFunction) => Promise<string>

/**
 * Properties that define how an icon is interpreted.
 */
declare interface IconProperties {
  /**
  * If true, the supplied icon will be displayed with its original color instead of being filled in white/black. Default is false.
  */
  preserveColor?: boolean
  /**
  * If true, the supplied icon will be displayed with its original aspect ratio instead of being scaled to fit a square. Default is false.
  */
  preserveAspect?: boolean
  /**
  * If true, the supplied icon will be drawn horizontally flipped. Default is false.
  */
  flipX?: boolean
  /**
  * If true, the supplied icon will be drawn vertically flipped. Default is false.
  */
  flipY?: boolean

  /**
  * Move the icon horizontally by the specified distance, expressed as percentage of the icon's width.
  */
  moveX?: number

  /**
    * Move the icon vertically by the specified distance, expressed as percentage of the icon's height.
    */
  moveY?: number

  /**
  * Scale the icon by the specified factor, expressed as a percentage of the original size.
  */
  scale?: number

  /**
    * Rotate the icon anticlockwise by the specified angle, expressed in degrees.
    */
  rotate?: number

  /**
    Draw the icon inside a square.
    */
  square?: boolean

  /**
    * Draw the icon inside a circle.
    */
  circle?: boolean

  /**
    * Draw the icon inside a magnifying glass shape.
    */
  search?: boolean

  /**
    * Draw a strike-through line over the icon.
    */
  strike?: boolean

  /**
    * Draw the enclosing shape as a solid shape.
    */
  filled?: boolean

  /**
    * For text icons only. Draw the text using a monospaced font.
    */
  monospaced?: boolean
}


/**
 * Properties common to Action and Extension
 */
declare interface ActionProperties extends IconProperties {

  /**
    * A unique identifying string. An identifier for an action can be any string of your choosing.
    */
  identifier?: string

  /**
     * The action's title.
     *
     * If no title is defined here, the extension's [`[name]] will be used, if any.
    */
  title?: LocalizableString

  /**
     * A string to define the action's icon.
     *
     * If no icon is defined here, the extension's {@link Extension.icon | icon} will be used, if any.
     * Setting to `null` explicitly sets the action to have no icon.
     */
  icon?: string | null

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
    */
  requirements?: Array<Requirement | NegatedRequirement>

  /**
    * Array of bundle identifiers for which the extension should appear. The action will only
    * appear if PopCLip is used in one of the specified apps.
    *
    * This property has no effect on dynamically generated actions.
    */
  requiredApps?: string[]

  /**
    * Array of bundle identifiers for which the extension should not appear. The action will not
    * appear if PopClip is used in any of the specified apps.
    *
    * This property has no effect on dynamically generated actions.
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
    * the first occurrence of the matched text is accessible later via {@link Input.matchedText | matchedText}.
    *
    * If there is no match, the action is excluded from the popup.
    *
    * The regex's `lastIndex` is reset before and after each invocation, so the `g` (global) and `y` (sticky) flags have no effect.
    *
    * This property has no effect on dynamically generated actions.
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
  apps?: AssociatedApp[]

  /**
  * An optional step to peform before the main action.
  */
  before?: BeforeStep

  /**
  * An optional step to peform after the main action.
  */
  after?: AfterStep

  /**
   * Whether PopClip will capture HTML and Markdown content for the selection. Default is no.
   */
  captureHtml?: boolean

  /**
   * Whether PopClip will capture RTF (Rich Text Format) content for the selection. Default is no.
   */
  captureRtf?: boolean

  /**
   * Whether PopClip's popup should stay on screen after clicking this action's button. Default is no.
   */
  stayVisible?: boolean

  /**
   * Whether the pasteboard should be restored to its original state after `paste-result`.
   */
  restorePasteboard?: boolean

  // static properties for benefit of JSON Schema
  shortcutName?: string
  serviceName?: string
  url?: string
  keyCombo?: string | number
  keyCombos?: Array<string | number>
  applescript?: string
  applescriptFile?: string
  applescriptCall?: {
    handler: string
    parameters?: string[]
  }
  shellScript?: string
  shellScriptFile?: string
  interpreter?: string
  javascript?: string
  javascriptFile?: string
}

/**
  * An action function is called when the user clicks the action button in PopClip. This is where
  * the extension does its main work.
  * @param input The selected text and related properties. (Same object as [[PopClip.selection]].)
  * @param options Current values of the options for this extension. (Same object as [[PopClip.options]].)
  * @param context Information about the context surrounding the selection. (Same object as [[PopClip.context]].)
  */
declare type ActionFunction<CustomOptions extends Options = Options> = (input: Input, options: CustomOptions & AuthOptions, context: Context) => Promise<string | void> | string | void

/**
 * **Action** represents the properties of a single action.
 * If `code` is omitted, the action displays a disabled title/icon only.
 */
declare interface Action<CustomOptions extends Options = Options> extends ActionProperties {
  code?: ActionFunction<CustomOptions>
}

// included for JSON Schema
declare type Entitlement = 'network' | 'dynamic'

/**
 * The Extension object defines the PopClip extension.
 */
declare interface Extension<CustomOptions extends Options = Options> extends ActionProperties {

  /**
   * The display name of this extension.
   */
  name?: LocalizableString

  /**
   * Defines the user-configurable options for this extension.
   */
  options?: Option[]

  /**
   * If you define this function then PopClip will display a 'sign in' button in the options UI. When the user clicks the button,
   * PopClip will call this function with an `info` object and an `flow` callback.
   *
   * If the sign in needs a username and password, you'll also need to define `username` and `password` options. PopClip will then pass the values
   * of those options in the info parameter. */
  auth?: AuthFunction<CustomOptions>

  /**
   * Define the actions to go in PopClip's popup. This can be an array or a function.
   *
   * - If it's an array, the supplied actions are used in the popup, subject to meeting the
   *   requirements and regex conditions.
   *
   * - If it's a population function, it is called by PopClip to dynamically populate the popup with actions from this extension.
   *   Setting requirements and regex keys has no effect on dynamic actions — the function itself is responsible for deciding what actions to show.
   *   Population function requires the `dynamic` entitlement.
   */
  actions?: (Action<CustomOptions> | ActionFunction<CustomOptions>)[] | PopulationFunction<CustomOptions>

  /**
   * Simplified property to define a single action.
   */
  action?: Action<CustomOptions> | ActionFunction<CustomOptions>

  // the following are static properties, included for the benefit of the JSON Scheme generation
  popclipVersion?: number
  macosVersion?: string
  entitlements?: Entitlement[]
  module?: string
}

/**
 * Defines a single extension option.
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
   *  * `secret`: concealed text entry field (persisted in user's keychain),
   *  * `password`: concealed text entry field (not persisted, only passed to auth function),
   *  * `heading`: adds a heading in the user interface, but does not actually define an option
   */
  type: 'string' | 'boolean' | 'multiple' | 'password' | 'heading' | 'secret'

  /**
   * A short label for this option.
   */
  label?: LocalizableString

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
   * An icon for this option. It is only displayed for boolean options, next to the check box.
   */
  icon?: string

  /*
   * If true, this option will be hidden in the prefs window. Default is false.
   */
  hidden?: boolean

  /*
   * If true, this option will be be inset to the right of its label, instead of below it. Default is false.
   */
  inset?: boolean
}

/**
 * Represents a generic range, as a location and length
 */
declare interface Range {
  location: number
  length: number
}

/**
 * An array of strings with an addiontal `ranges` property defining the source of the data in the orignal string.
 */
declare interface RangedStrings extends Array<string> {
  ranges: Range[]
}

/**
 * Input defines properties to access the input text contents.
 */
declare interface Input {
  /**
   * The plain text selected by the user. If there is no selected text, this will be the empty string.
   */
  text: string

  /**
   * If the action specified {@link Action.requirements | requirements} or a {@link Action.regex | regex} to match the input, this will be the matching part of the text.
   * Otherwise, it will be the same string as [[text]].
   */
  matchedText: string

  /**
   * If the action specified a {@link Action.regex | regex} to match the input, this will be the result of the the match.
   *
   * You can use this to access any capture groups from the regex.
   *
   * If the regex was specified as a JavaScript regex, the value is a return value from JavaScript's
   * [RegExp.prototype.exec()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) method.
   *
   * If the regex was specified as an ICU regex in the static config, the value is the array of capture components.
   *
   * #### Example
   * ```js
   * // text: "apple", regex: /.(.)/
   * selection.regexResult[0] // "ap" (full match)
   * selection.regexResult[1] // "p" (capture group 1)
   * ```
   */
  regexResult?: RegExpMatchArray | string[] | null

  /**
   * HTML content (if `captureHtml` is true).
   */
  html: string

  /**
   * XHTML content (if `captureHtml` is true).
   */
  xhtml: string

  /**
   * Markdown content (if `captureHtml` is true).
    */
  markdown: string

  /**
   * RTF content (if `captureRtf` is true).
   */
  rtf: string

  /**
   * Data of various kinds, that PopClip detected in the selected text.
   */
  data: {
    /**
     * HTTP ot HTTPS urls.
     */
    urls: RangedStrings
    /**
     * Other protocols or app urls e.g. `ftp:`, `omnifocus:`, `craftdocs:` etc. (PopClip has a pre-defined allowlist
     * for custom URL schemes.)
     */
    nonHttpUrls: RangedStrings
    /**
     * Email addresses.
     */
    emails: RangedStrings
    /**
     * Local file paths.
     * */
    paths: RangedStrings
  }

  /**
   * Unprocessed selection contents indexed by UTI.
   */
  content: PasteboardContent

  /**
  Indicate if the text content is *just* a web URL (or URL-like string
  such as `popclip.app`), allowing for leading and trailing whitespace.
  */
  isUrl: boolean
}

/**
*  Properties relating the context surrounding the selected text.
*/
declare interface Context {
  /**
   * Indicates whether the text area supports formatting.
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
 * Represents the current values of the extension's settings.
 */
declare interface Options {
  readonly [identifier: string]: string | boolean
}

/**
 * The `authsecret` property has the special behaviour of throwing an `Error` with the message 'Not signed in' if it is accessed while either
 * undefined or holding an empty string.
 */
declare interface AuthOptions {
  /**
   * The stored value that was returned from the `auth()` function.
   */
  authsecret: string
}

/**
* This interface describes the methods and properties of the global [[`popclip`]] object.
*
*/
declare interface PopClip {
  /**
     * The state of the modifier keys when the action was invoked in PopClip.
     *
     * #### Notes
     * During the execution of the population function, all the modifiers will read as false.
     */
  readonly modifiers: Modifiers

  /**
     * The current selection.
     */
  readonly input: Input

  /**
     * The current context.
     */
  readonly context: Context

  /**
     * The current values of the options.
     */
  readonly options: Options & AuthOptions

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
     */
  pasteText: (text: string, options?: PasteOptions) => void

  /**
   * Paste arbitrary pasteboard content.
   */
  pasteContent: (content: PasteboardContent, options?: PasteOptions) => void

  /**
     * Places the given string on the pasteboard, and shows "Copied" notificaction to the user.
     * @param text The plain text string to copy
     */
  copyText: (text: string) => void

  /**
   * Copy arbitrary pasteboard content.
   */
  copyContent: (content: PasteboardContent) => void

  /**
     * Invokes a command in the target app.
     * @param command Either `cut`, `copy` or `paste`.
     * @param options Options for the command.
     */
  performCommand: (command: 'cut'|'copy'|'paste', options?: {
    /** Transformation to apply to the pasteboard contents. (Default: `none`)
     * - `none`: regular pasteboard operation
     * - `plain`: strips away everything but plain text
     */
    transform?: 'none'|'plain'
  }) => void

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
     * #### Examples
     *
     * ```js
     * // press the key combo ⌘B
     * popclip.pressKey('command B');
     * // press the key combo ⌥⌘H
     * popclip.pressKey('option command H');
     * // press the return key
     * popclip.pressKey('return');
     * popclip.pressKey(util.constant.KEY_RETURN); // equivalent
     * * // press option and the page down key
     * popclip.pressKey('option 0x79');
     * popclip.pressKey(0x79, util.constant.MODIFIER_OPTION); // equivalent
     * ```
     *
     * #### Notes
     *
     * Some key code and modifier constants are available in {@link Util.constant | util.constant}.
     *
     * @param key The key to press. When this parameter is a string, PopClip will interpret it as in
     * [Key Press actions](https://www.popclip.app/dev/key-press-actions).
     * When this parameter is a number, PopClip will use that exact key code.
     *
     * @param modifiers An optional bit mask specifiying additional modifier keys, if any.
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
     * - If the URL has the http or https scheme, and the current app is a browser, the URL is opened in the current app.
     * - Otherwise, PopClip asks macOS to open the URL in the default handler for that URL type.
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
     * @param options Options.
     */
  openUrl: (url: string, options?: {
    /**
     * Bundle identifier of the app to open the URL with. For example `"com.google.Chrome"`.
     */
    app?: string
  }) => void

   /**
    * Share items with a named macOS sharing service.
    *
    * #### Example
    * ```js
    * // share a string with the Messages service
    * popclip.share("com.apple.share.Messages.window", ["Hello, world!"]);
    * // share a URL with the Safari Reading List service
    * popclip.share("com.apple.share.System.add-to-safari-reading-list", [{ url: "https://example.com" }]);
    * // share a an html string with the Notes service
    * const item = new RichString("Some <b>simple</b> html", { format: html })
    * popclip.share("com.apple.Notes.SharingExtension", [item]);
    * ```
    *
    * #### Notes
    *
    * The list of available sharing services is determined by the user's system configuration.
    *
    * @param serviceName The name of the sharing service to use.
    * @param items An array of items to share. Each item can be a string, a {@link RichString} object, or an object with a `url` property.
    * @throws If the service name is not recognized, or if the service cannot handle the supplied items, an error is thrown.
    */
  share: (serviceName: string, items: (string | RichString | { url: string } )[]) => void
}

/**
 * The global `popclip` object encapsulates the user's current interaction with PopClip, and provides methods
 * for performing various actions. It implements [[PopClip]].
 */
declare const popclip: PopClip

/**
 * Represents a formatted text string. The underlying implementation uses a macOS Attributed String (`NSAttributedString`) object.
 * Can be constructed from a plain string in RTF, HTML, or Markdown format.
 *
 * #### Example
 * ```js
 * // create a RichString object from a html string
 * const item = new RichString("<b>bold</b> and <i>italic</i>.", {format: 'html'});
 * // create a RichString object from a markdown string
 * const item = new RichString("# Title\n\nBody.", {format: 'markdown'});
 * ```
 */
declare class RichString {
  /**
    * Create a new RichString object from a string.
    *
    * @param source The string to convert to a RichString object.
    * @param options Options for the conversion.
    */
  constructor (source: string,
               options?: {
      /**
       Format of the source string. Default is 'rtf'.
       */
      format?: 'rtf' | 'html' | 'markdown',
      }
  );
  /**
   * An RTF representation of the content.
   */
  readonly rtf: string
  /**
   * An HTML representation of the content.
   */
  readonly html: string
}

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

  localeInfo: {
    localeIdentifier: string
    regionCode: string
    languageCode: string
    decimalSeparator: string
    groupingSeparator: string
    currencyCode: string
    currencySymbol: string
  }

  timeZoneInfo: {
    identifier: string
    abbreviation: string
    secondsOffset: number
    daylightSaving: boolean
  }

  htmlToRtf: (html: string) => string | undefined

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
     * Throws an error if the input cannot be decoded as a UTF-8 string.
     *
     * @param string
     * @returns The decoded string
     */
  base64Decode: (string: string) => string

  /** Build a URL from a base URL and additional query parameters */
  buildQueryUrl: (baseUrl: string, params: {[string]: string}) => string

  /** Build a query from params object */
  buildQuery: (params: {[string]: string}) => string

  /** Parse a query into params object */
  parseQuery: (query: string) => any

  /** Decipher a JSON object that has been lightly obscured to prevent constants such as
   * API keys appearing in plaintext in the source files.
   *
   * This function will ROT13 decipher the text, apply Base64 decoding, and parse the result as JSON. */
  clarify: (obscuredString: string) => any

  // same as global sleep()
  sleep: (durationMilliseconds: number) => Promise<void>

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
declare const util: Util

/**
 * Represents the raw pasteboard content, indexed by UTI. Supports string data only.
 */
declare interface PasteboardContent {
  'public.utf8-plain-text'?: string
  'public.html'?: string
  'public.rtf'?: string
  [string: string]
}

/**
 * Options for Paste operations.
 */
declare interface PasteOptions {
  /**
   * Whether to restore the original contents of the pasteboard after the paste
   * operation. Default is `false`.
   */
  restore?: boolean
}

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

  /**
   * Get and set the content of the pasteboard, of the specified types
   */
  content: PasteboardContent
}

/**
 * The global `pasteboard` object provides access to the contents of the macOS general pasteboard (i.e. the system clipboard). It implements [[Pasteboard]].
 */
declare const pasteboard: Pasteboard

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
declare function print (...args: any[]): void

/*
 * Export an object for use by another file.
 *
 * #### Notes
 *
 * The _define_ function family exports an arbitrary object, which other files can import using [[require]].
 *
 * It should be called only once in any file; if it is called more than once, only the
 * final call will have any effect.
 *
 * Partially implements AMD spec: https://github.com/amdjs/amdjs-api/wiki/AMD
 *
 * Note that using `define()` in your extensions is not recommended. Instead, use [[defineExtension]] or
 * `module.exports = ...`.
 */
declare function define (object: object): void
declare function define (factory: () => object): void
declare function define (dependencies: string[], factory: () => object): void
declare function define (id: string, factory: () => object): void
declare function define (id: string, dependencies: string[], factory: () => object): void

/**
 * This global function may be called as an alternative to setting `module.exports` directly.
 * The advantage of using `defineExtension()` is that you will automatically get type checking
 * and autocomplete for your extension object.
 *
 * You may define the shape of the extensions's options object by specifying the
 * `CustomOptions` generic type parameter. This will enable type checking and autocomplete for
 * the `options` parameter in action functions and the population function.
 *
 * @param extension The extension object to export.
 */
declare function defineExtension<CustomOptions extends Options = Options> (extension: Extension<CustomOptions>): void

/* Declare ambient module + exports for CommonJS-style exporting */
declare const module: { exports: any }
declare const exports: any

/**
  * Import an object from another file.
  *
  * #### Notes
  *
  * PopClip's `require()` implementation attempts to import from the following module formats:
  *
  * - AMD modules, which use `define(...)`.
  * - CommonJS modules, which use `module.exports = ...` or `exports.name = ...`
  * - TypeScript-compiled ES modules, which use `exports.default = ...`
  *
  * #### Notes
  *
  * Paths beginning with `./` or `../` are resolved relative to the the location of the current file.
  *
  * Otherwise, the path is resolved relative to the extensions's package root.
  * If there is no file in the extension, PopClip will look in its internal module repository.
  *
  * If no file extension is given, PopCLip will try adding the extensions `.js`, `.ts`, `.json` in that order.
  *
  * TypeScript files are transpiled to JavaScript on the fly.
  *
  * JSON files are parsed and returned as an object.å
  *
  * @param file Path to the file to import.
  * @return The imported object.
  */
declare function require (file: string): object

/**
 * A promise-based sleep function. Included as a more convenient alternative
 * to [[setTimeout]] for performing simple delays. Call as `await sleep(1000)`.
 * @param durationMilliseconds How long to sleep in milliseconds
 */
declare function sleep (durationMilliseconds: number): Promise<void>

/* WebAPI and Node.js Globals
 * The following functions and objects are available in PopClip via polyfills.
 */

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
 */
declare function setTimeout (callback: (...args?: any) => void, timeout?: number, ...args?: any): number

/**
 * Cancels a timeout prevouly created with [[setTimeout]].
 * @param timeoutId Identifier of the timeout to cancel.
 */
declare function clearTimeout (timeoutId: number): void

// XMLHttpRequest is implemented natively in PopClip; I recommend using axios instead.
declare const XMLHttpRequest;

// these are from WebAPI, and are implemented with core-js polyfills
declare function btoa (string: string): string
declare function atob (string: string): string
declare const URL
declare const URLSearchParams
declare function structuredClone<T>(value: T): T;

// this is implemented with 'node-blob` library
declare const Blob

// Buffer is a node.js object, iplemented with 'buffer' library
declare const Buffer
