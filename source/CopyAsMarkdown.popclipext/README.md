# Copy as Markdown

Copy web page content as Markdown source code. Also works on plain text and RTF content.

### Options

* **Heading Style**: Choose between ATX-style headings (`# Heading`) and Setext-style headings (`Heading\n=======`).
* **Bullet List Marker**: Choose between `*`, `-`, and `+` for bullet lists.
* **&lt;em&gt; Delimiter**: Choose between `*` and `_` for `<em>` elements.
* **&lt;strong&gt; Delimiter**: Choose between `**` and `__` for `<strong>` elements.
* **Link Style**: Choose between inlined links (`[text](url)`) and reference links (`[text][id]`).

## About

This is an extension for [PopClip](https://www.popclip.app/).

### Author

Nick Moore

### Requirements

Requires PopClip 2023.7.

### Notes

The original extension used [html2text](https://pypi.python.org/pypi/html2text/3.200.3) by Aaron Swartz.

The updated JavaScript extension uses [Turndown](https://github.com/mixmark-io/turndown).

Hat-tip to Brett Terpstra whose [Web Markdownifier](http://brettterpstra.com/2013/12/23/web-markdownifier-for-popclip/) extension inspired this one.

## Changelog

### 13 May 2024

* Added output format options as per [forum request](https://forum.popclip.app/t/updated-extension-copy-as-markdown/603/4).

### 3 Feb 2022

* Rewritten in JavaScript & Turndown.

### 7 Dec 2016

* Initial release (Python & html2text)
