# "Bike" PopClip Extension

Capture selected text from PopClip into a [Bike][1] document.

You can specify a row to act as an "inbox", or simply add rows to the document root.
The selection is treated as plain text, so formatting is not preserved.
Multi-line selections are imported as separate rows.

### Settings

- **Document Path**: The absolute path of a saved Bike document, such as
  `/Users/me/Documents/Ideas.bike`.

- **Inbox Row**: The exact text of the row that should receive captures. The
  extension uses the first matching row, or creates a heading with that name at the
  document root if there is no match. Leave the option blank to append directly to
  the document root.

- **Add At**: Whether to add rows at the **Top** or **Bottom** of the existing list.

## Notes

Author: Nick Moore

Works with [Bike Outliner][1], a native Mac app by Jesse Grosjean (Hog Bay Software).

The extension uses [Bike's AppleScript interface][2].

## Changelog

- 2026-08-18: Initial release

[1]: https://www.hogbaysoftware.com/bike/
[2]: https://bikeguide.hogbaysoftware.com/customizing-bike/creating-scripts
