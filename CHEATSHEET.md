# PopClip Extensions — LLM Cheat Sheet

Goal: Enable an LLM to synthesize small, working PopClip extensions (especially
snippets) quickly and safely. This distills the essentials from `site/dev`.

## Snippet Basics

- Snippet = single YAML/JSON block that starts with `#popclip` (or `# popclip`).
- Parse is YAML 1.2; JSON works too. Max 5000 chars when pasted; unlimited in
  `.popcliptxt` files.
- Minimal install path: user selects the whole block in any app → PopClip offers
  “Install Extension”. Re‑install with same `name` replaces it (unless
  `identifier` is set).

Example: simple web search

```yaml
#popclip
name: Urban Dictionary
icon: UD
url: https://www.urbandictionary.com/define.php?term=***
```

## Where Things Go

- Single action: put action fields at top level.
- Multiple actions: use `actions: [ … ]`, each with its own fields.
- Top‑level fields apply to all actions unless overridden inside an action.

## Common Fields (top level or per‑action)

- `name` (Required once): Human name for the extension.
- `title`: Button label/tooltip for a specific action.
- `icon`: Icon spec (see Icons). If omitted, falls back to extension icon or
  label.
- `regex`: Show only when selection matches this regex; capture groups
  available.
- `requirements`: Array of conditions like `text`, `urls`, `paste`.
- `required apps`: Array of app bundle IDs the action requires.
- `capture html`: true to expose HTML/Markdown of the selection.
- `before`: One of `copy`, `cut`, `paste`, `paste-plain`, `copy-selection`,
  `popclip-appear`.
- `after`: One of `copy-result`, `paste-result`, `preview-result`,
  `show-result`, `show-status`, `cut`, `copy`, `paste`, `paste-plain`,
  `popclip-appear`, `copy-selection`.

Key name normalization: `key name`, `keyName`, `key-name`, etc. are equivalent.
Prefer `lowercase with spaces` in YAML.

## Action Types (choose one per action)

### Open URL

- Fields: `url` (required), `alternate url` (optional), `clean query` (bool).
- Placeholders: use `***` or `{popclip text}` in the URL template. Options can
  be inserted with `{popclip option <id>}`.

```yaml
#popclip
name: Rotten Tomatoes
icon: iconify:simple-icons:rottentomatoes
url: https://www.rottentomatoes.com/search?search=***
```

### Key Press

- Fields: `key combo` (string) or `key combos` (array). No input/output.
- Format examples: `command b`, `option shift .`, `return`, `f12`, `0x74`,
  `numpad /`.
- In arrays you can include `wait <milliseconds>` rows.

```yaml
#popclip
name: Bold
icon: B
key combo: command b
```

```yaml
#popclip
name: Paste and Enter
requirements: [paste]
key combos:
  - command v
  - wait 50
  - return
```

### JavaScript

- Fields: `javascript` (string) or `javascript file` (path in a package).
- Run in PopClip’s JS sandbox; input via `popclip` global; return a string to
  feed `after`.

```yaml
#popclip
name: Markdown Italic
requirements: [text, paste]
after: paste-result
javascript: popclip.pasteText('*' + popclip.input.text + '*')
```

JS input quick refs (via `popclip`):

- `popclip.input.text`, `matchedText`, `regexResult`
- `popclip.input.html`, `markdown` (when `capture html: true`)
- `popclip.input.data.urls`
- `popclip.context.browserUrl`, `browserTitle`
- `popclip.modifiers.{command|option|shift|control}`
- `popclip.options.<id>`

Useful JS methods: `pasteText()`, `copyText()`, `showText()`, `openUrl()`,
`pressKey()`, `performCommand()`, `showSuccess()/showFailure()/showSettings()`.

### Shell Script

- Fields: `shell script` (string) or `shell script file` (path), optional
  `interpreter`, optional `stdin`.
- Input via env vars (e.g., `POPCLIP_TEXT`, `POPCLIP_OPTION_FOO`) or stdin when
  `stdin: text|…`.
- Output: write to stdout; captured for `after`. Exit 0 success; non‑zero
  failure; exit 2 triggers “settings” UI.

```yaml
#popclip
name: Say
interpreter: zsh
shell script: say -v Daniel $POPCLIP_TEXT
```

### AppleScript

- Fields: `applescript` (string) or `applescript file`, optional
  `applescript call`.
- Plain text scripts use placeholders like `{popclip text}`; compiled `.scpt`
  must use a handler and pass parameters.
- Return a string for `after`. Error number 502 triggers the extension settings
  UI.

```applescript
-- #popclip
-- name: LaunchBar
-- language: applescript
tell application "LaunchBar" to set selection to "{popclip text}"
```

### Shortcuts and Services

- macOS Shortcuts: `shortcut name: <Name>` (requires macOS 12+).
- macOS Service: `service name: <Service Menu Item Title>`.

```yaml
#popclip
name: Run My Shortcut
icon: symbol:moon.stars
macos version: "12.0"
shortcut name: My Shortcut Name
```

## Regex and Matching

Order and narrowing:

- First, `requirements` are evaluated. If you use `url`, `isurl`, `email`, or
  `path`, PopClip narrows the working text to that detected value and normalizes
  it (URLs expanded to full form, paths standardized). If any requirement is not
  met, the action is hidden.
- Next, `regex` (if present) is applied to the current working text. If it
  matches, the match is passed to the action; otherwise the action is hidden.

Access in scripts:

- JavaScript: `popclip.input.matchedText` (narrowed),
  `popclip.input.regexResult` (capture array), `popclip.input.text` (full
  selection).
- Shell/AppleScript: `POPCLIP_TEXT` / `{popclip text}` (narrowed),
  `POPCLIP_FULL_TEXT` / `{popclip full text}` (full).

Tip: Prefer `requirements` for URL/email/path detection instead of custom regex.

## Options (User Settings)

Add an `options:` array. Each option becomes available as:

- JS: `popclip.options.<identifier>`
- Shell/AppleScript: `POPCLIP_OPTION_<IDENTIFIER_UPPER>` or
  `{popclip option <identifier>}`

Types: `string`, `boolean`, `multiple` (with `values`), `secret`, `heading`.

```yaml
options:
  - identifier: subdomain
    type: string
    label: Site subdomain
    defaultValue: en
```

Use in URL:

```yaml
url: https://{popclip option subdomain}.wiktionary.org/wiki/{popclip text}
```

## Icons (Quick)

- Text: up to 3 chars, e.g. `icon: T` or `icon: text:AB`.
- Iconify: `icon: iconify:set:name` e.g. `iconify:mdi:home`.
- SF Symbols: `icon: symbol:hand.raised`.
- Modifiers: `square`, `circle`, `filled`, `search`, `strike`, `monospaced`,
  `flip-x`, `flip-y`, `move-x=10`, `move-y=-5`, `scale=120`, `rotate=45`,
  `preserve-color`, `preserve-aspect`.

Examples: `square filled T`, `circle filled iconify:mdi:home`,
`strike symbol:link`.

## Inverted Syntax (Great for longer scripts)

Put the config as comments at the top; the whole snippet body becomes the script
file.

JavaScript example:

```javascript
// # popclip
// name: Uppercase
// after: paste-result
// language: javascript
return popclip.input.text.toUpperCase();
```

Shell example (with shebang):

```zsh
#!/bin/zsh
# #popclip
# name: Say
say $POPCLIP_TEXT
```

AppleScript example:

```applescript
-- #popclip
-- name: LaunchBar
-- language: applescript
tell application "LaunchBar" to set selection to "{popclip text}"
```

## Script Variables (non‑JS)

Available to Shell/AppleScript as env vars or placeholders:

- Selection: `text`, `full text`, `urlencoded text`
- Rich text: `html`, `raw html`, `markdown` (requires `capture html: true`)
- URLs in selection: `urls` (newline‑separated)
- App context: `bundle identifier`, `app name`
- Browser context: `browser url`, `browser title`
- Modifiers: `modifier flags` (numeric bitmask)
- Options: `option <identifier>` per option
- IDs: `extension identifier`, `action identifier`

Examples:

- Shell: `$POPCLIP_TEXT`, `$POPCLIP_OPTION_FOO`, `$POPCLIP_BROWSER_URL`
- AppleScript: `{popclip text}`, `{popclip option foo}`, `{popclip browser url}`

## Error Signalling

- JS: throw to fail. To open settings, throw with message starting
  `settings error` or `not signed in`.
- Shell: non‑zero exit fails; exit code 2 opens settings.
- AppleScript: `error "…" number 502` opens settings.

## Handy Patterns

Multi‑action snippet:

```yaml
#popclip
name: Markdown Formatting
requirements: [text, paste]
actions:
  - title: Bold
    icon: circle filled B
    javascript: popclip.pasteText('**' + popclip.input.text + '**')
  - title: Italic
    icon: circle filled I
    javascript: popclip.pasteText('*' + popclip.input.text + '*')
```

Conditional per app (key press differs):

```yaml
#popclip
name: Superscript
icon: iconify:tabler:superscript
actions:
  - required apps: [com.microsoft.Word]
    key combo: command shift =
  - required apps: [com.apple.iWork.Pages]
    key combo: command control +
```

Use HTML/Markdown of selection:

```yaml
#popclip
name: Show HTML
capture html: true
after: show-result
javascript: return popclip.input.markdown
```

## Packaging (when not a snippet)

- Folder ends with `.popclipext` containing `Config.json|yaml|plist|js|ts` plus
  assets.
- Zip and rename to `.popclipextz` for distribution. Double‑click installs.

## Gotchas & Tips

- YAML: use spaces, not tabs; quote values that look like booleans if you mean
  strings.
- Names/keys are case‑ and style‑insensitive.
- For URL templates, PopClip always trims and URL‑encodes the inserted text; use
  `clean query: true` to normalize whitespace.
- For JS TypeScript files in packages, `.ts` is supported; return strings only.
- Prefer Iconify/SF Symbols or short text icons for quick snippets.
