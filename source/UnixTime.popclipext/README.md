# Unix Time

Convert a selected Unix timestamp into a readable date and time.

The converted value appears directly in PopClip's action button. Click the
button to copy the value to the clipboard.

For example, selecting `1535438729` produces:

```text
2018-08-28 06:45:29 UTC
```

With automatic millisecond handling enabled, selecting `1535438729000`
produces the same result:

```text
2018-08-28 06:45:29 UTC
```

Spaces within timestamps are accepted, such as `2 147 483 647`.

## Options

- **Date & Time Format:** Use the international `YYYY-MM-DD HH:MM:SS` format or
  the format from the system settings. The default is International Standard.
- **Time Zone:** Display the result in UTC or the system time zone. The default
  is UTC.
- **Automatically handle milliseconds:** Treat values greater than `4294967295`
  as milliseconds instead of seconds. Enabled by default.

## Notes

Author: Nick Moore, [@kstrauser](https://github.com/pilotmoon/PopClip-Extensions/pull/1312)

## Changelog

- 31 Aug 2026: Add automatic handling of timestamps expressed in milliseconds.
  Convert to TypeScript and display the converted value directly
  in the button. Clicking the action copies the result.
- 12 Nov 2024: Improve Unix timestamp matching.
- 18 Apr 2022: Rewrite the extension in JavaScript for macOS Monterey.
