# Base64

Encode and decode text using Base64 encoding.

The extension defines two actions:

* **Base64 Encode:** Enabled for all text inputs. It is actually a two-stage process: the text is first encoded to bytes using UTF-8 encoding, and then the bytes are encoded in Base64.

* **Base64 Decode:** Enabled for inputs which only contain Base64-legal characters. Decoding is the reverse of encoding. If the decoded bytes are not valid UTF-8, the action will fail and show an 'X'.

The extenson has the following options:

* *Base64 Variant*: Choose from *Standard* or *URL Safe*. In the URL Safe variant, the `+` and `/` characters are mapped to `-` and `_` when encoding. (Default: Standard)
  
* *Trim `=` padding*: Whether to trim off any trailing `=` or `==` padding after encoding. (Default: yes)

The decode action will accept both Standard and URL Safe variants, with or without `=` padding.

References:

* [Base64 (Wikipedia)](https://en.wikipedia.org/wiki/Base64)
* [RFC 4648 (IETF)](https://datatracker.ietf.org/doc/html/rfc4648)

## About

This is an extension for [PopClip](https://pilotmoon.com/popclip/).

### Author

Nick Moore

### Requirements

Requires PopClip 2021.11.

## Changelog

### 5 Nov 2021

* Update JavaScript for PopCLip 2021.11.
* Rename to "Base64".
* Swap the icons (solid icon for encoding, outline for decoding).

### 1 Oct 2021

* Rewritten in JavaScript.
* Added 'trim spaces' option.
  
* ### 4 Jun 2015

* Initial release (PHP), as "Base64 Encode".
