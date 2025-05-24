# HTML Encode

Encode and decode HTML character entties in text.

### Description

_Encoding_ (solid filled icon) has two modes, configurable in the options:

- **HTML special characters only**: Only the characters `<`, `>`, `&`, `"` and `'` will be encoded (as `&lt;`, `&gt;`, `&amp;`, `&quot;` and `&apos;` respectively).

- **All non-ASCII characters**: All non "ASCII printable" characters will be encoded. For example the string `⪐⅔Ãµ やあ` is encoded as `&gsiml;&frac23;&Atilde;&micro; &#12420;&#12354;`.

_Decoding_ (outlined icon) simply decodes all HTML entities encountered back to their corresponding characters.

### Info

Author: Nick Moore

This extension is implemented using [entities](https://github.com/fb55/entities) (MIT license).

Some info about HTML entities: <https://developer.mozilla.org/en-US/docs/Glossary/Entity>

## Changelog

### 19 May 2024

Rewritten using `entities` module which is built in to PopClip.

### 16 Oct 2021

- Restructured code using TypeScript.
- Added this readme.

### 24 Sep 2021

- New implementation in JavaScript for PopClip 2021.9.

### 14 Aug 2014

- Add decoding ability.

### 29 Aug 2013

- Initial release (implemented in PHP).
