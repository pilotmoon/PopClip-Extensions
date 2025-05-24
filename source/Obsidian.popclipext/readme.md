# Obsidian PopClip Extension

Captures the selected text to [Obsidian][obsidian], placing it either in a
specified file or in the Daily Note page, optionally under a configurable
heading.

When the text is captured from a supported browser, the source link will be
added.

**⚠️ Heads up! Preparation steps in Obsidian are needed. Please read the
Configuration section carefully.**

## Configuration

Prerequisites:

- Install [Obsidian][obsidian].
- 👉 Install and enable the [Obsidian Advanced URI][uri-plugin] community
  plugin. 👈
- Know the name of the destination vault in Obsidian.
- Decide whether you want to append to Daily Note or a named file.
  - For Daily Note:
    - Activate the [Daily Note][dailynote-plugin] plugin in Obsidian.
    - If you want to append under a heading, add that heading to the Daily Note
      template in Obsidian.
  - For a named file:
    - Know the name of the file you want to append to.
    - If you want to append under a heading, add that heading to the file.

PopClip extension settings:

- **Vault Name**: The name of the vault in Obsidian.
- **File Name**: Enter the name of the file to append to, or leave blank to use
  the Daily Note.
- **Always create new file**: When off (default), clippings will all be appended
  <!-- to the same file. When enabled, a new file will be created every time the -->
  action is triggered, with an incrementing number appended to the file name.
- **Heading**: Optionally, an existing heading in the destination file under
  which to append the text. Leave blank to append to the end of the file.
- **Include source link**: Whether to include the source page link when
  capturing from a supported browser.
- **Include timestamp**: Whether to include a timestamp at the beginning of the
  captured text. The format is `- HH:MM {captured text}`. (This format works
  with Obsidian's [Thino](https://github.com/Quorafind/Obsidian-Thino) plugin.)

Troubleshooting:

- If the vault name does not exist, the capture action will silently fail.
- If the file name does not exist, the capture action will silently fail.
- If you don't specify a file name and the Daily Note plugin is not enabled, the
  capture action will silently fail.
- If you specify a heading but the heading does note exist in the file or Daily
  Note template, the capture action will silently fail.

## Notes

Author: Nick Moore, based on original snippet posted by [forum user EdM][edm].
Icon by Simple Icons.

[obsidian]: https://obsidian.md/
[uri-plugin]: https://publish.obsidian.md/advanced-uri-doc/Home
[dailynote-plugin]: https://help.obsidian.md/Plugins/Daily+notes
[edm]: https://forum.popclip.app/t/clip-selection-to-obsidian/359

## Changelog

- 7 Feb 2025: Add "Include timestamp" option. Thanks,
  [dangehub](https://github.com/pilotmoon/PopClip-Extensions/pull/1271).
- 22 Nov 2024: Add option to create new file every time (as per
  [forum request](https://forum.popclip.app/t/clip-selection-to-obsidian/359/37?u=nick)).
- 12 Jun 2024: Add option whether to include source link.
- 27 May 2023: Initial release.
