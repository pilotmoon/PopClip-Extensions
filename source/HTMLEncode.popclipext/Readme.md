# HTML Encode

Encode and decode HTML/XML [character entities](https://developer.mozilla.org/en-US/docs/Glossary/Entity) in text.

### Description

*Encoding* (outlined icon) has two modes, configurable in the options: 

* **HTML special characters only**: Only the characters `<`, `>`, `&`, `"` and `'` will be encoded (as `&lt;`, `&gt;`, `&amp;`, `&quot;` and `&apos;` respectively).

* **All non-ASCII characters**: All non "ASCII printable" characters will be encoded. For example the string `⪐⅔Ãµ やあ` is encoded as `&gsiml;&frac23;&Atilde;&micro; &#12420;&#12354;`.

*Decoding* (solid filled icon) simply decodes all HTML entities encountered back to their corresponding characters.

### Requirements

Requires [PopClip](https://pilotmoon.com/popclip/download) Build 3624 or above.

### Author

Nick Moore

### Acknowledgements

This extension is implemented using [html-entities](https://github.com/mdevils/html-entities) (MIT license).

## Changelog

### v4 — 16 Oct 2021

- Restructured code using TypeScript, for PopClip Build 3624 ([beta](https://pilotmoon.com/popclip/download)).
- Added this readme.
- TODO: Build and publish the .popclipextz when the beta is released.

### v3 — 24 Sep 2021

- New implementation in JavaScript for PopClip 2021.9.

### v2 — 14 Aug 2014

- Add decoding ability.

### v1 — 29 Aug 2013

- Initial release (implemented in PHP).