# UpNote

Create a new note, append to a specific note, or create a note in a specific notebook in the [UpNote](https://getupnote.com/) macOS app.

## Actions

- **UpNote New Note**: Create a new note with the selected text. If the text comes from a [supported browser](https://www.popclip.app/kb/browsers), the source page link will be added.
- **UpNote Append to Note**: Append the selected text to the end of a specified note, automatically inserted after a blank line.
- **UpNote New Note in Notebook**: Create a new note directly inside a specific notebook.

## Configuration

In PopClip's extension preferences for UpNote, you can configure:

- **Target Note URL or ID**: Right-click any note in UpNote and choose *Copy Link to Note*, then paste it here (supports `upnote://x-callback-url/openNote?noteId=...` or raw UUID).
- **Target Notebook Name**: The name of the target notebook in UpNote (e.g. `Inbox` or `Parent/Child Notebook`).
- **Include Source Link**: Automatically append source page link when text is selected from a browser (enabled by default).
- **Include Timestamp**: Prepend a timestamp (e.g. `- 14:30`) to the inserted or created content.

Author: Nick Moore (enhanced by @houtacheng)

## Changelog

- 17 Sep 2024: Added append to specific note and create in notebook actions.
- 25 May 2024: Initial release.

