# Copy as Markdown

Copy web page content as Markdown source code. Also works on plain text and RTF content.

HTML tables are converted to GitHub-flavored Markdown tables:

* The first row becomes the header row, even when the source has no `<th>` cells (as with tables copied from Google Sheets, Excel and Numbers). Stacked header rows are merged into one, e.g. "Latest release" above "Version" becomes "Latest release: Version".
* Markdown has no merged cells, so a value spanning several rows or columns is repeated in each cell it covers. A value spanning the full width (a section label) appears once.
* Column alignment comes from the `<td>` cells' `align` attribute or `text-align` style, when they agree. `<th>` cells are ignored because browsers copy them with their default centering.
* Line breaks and paragraphs inside a cell become `<br>` or a space (see options), and `|` is escaped as `\|`. Links inside tables are always inline, because a cell has to stay on one line.
* Tables that contain other tables, or have only one cell, are treated as page layout and their contents are converted as ordinary blocks.
* PopClip's sanitized HTML drops `colspan` and `rowspan`, so for tables the extension reads the raw HTML of the selection instead.

### Options

* **Heading Style**: Choose between ATX-style headings (`# Heading`) and Setext-style headings (`Heading\n=======`).
* **Bullet List Marker**: Choose between `*`, `-`, and `+` for bullet lists.
* **&lt;em&gt; Delimiter**: Choose between `*` and `_` for `<em>` elements.
* **&lt;strong&gt; Delimiter**: Choose between `**` and `__` for `<strong>` elements.
* **Link Style**: Choose between inlined links (`[text](url)`) and reference links (`[text][id]`).
* **Pad Table Columns**: Pad table cells with spaces so the pipes line up in plain text (on by default).
* **Line Breaks in Table Cells**: `<br>` (GitHub, Obsidian) or a space (for apps that show `<br>` literally, such as Apple Notes).

### Notes

Author: Nick Moore.

The original extension used [html2text](https://pypi.python.org/pypi/html2text/3.200.3) by Aaron Swartz.

The updated JavaScript extension uses [Turndown](https://github.com/mixmark-io/turndown).

Hat-tip to Brett Terpstra whose [Web Markdownifier](http://brettterpstra.com/2013/12/23/web-markdownifier-for-popclip/) extension inspired this one.

## Changelog

- 5 October 2026: Added conversion of HTML tables to Markdown tables, and the Pad Table Columns and Line Breaks in Table Cells options.
- 5 October 2026: The contents of `<style>` and `<script>` elements are no longer emitted as text.
- 8 June 2024: Updated required PopClip version to 2024.5.2.
- 13 May 2024: Added output format options as per [forum request](https://forum.popclip.app/t/updated-extension-copy-as-markdown/603/4).
- 3 Feb 2022: Rewritten in JavaScript & Turndown.
- 7 Dec 2016: Initial release (Python & html2text)
