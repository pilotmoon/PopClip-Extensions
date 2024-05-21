# Messages

Sends the selected text to the macOS Messages sharing service.

### Notes

Uses the service identifier `com.apple.messages.ShareExtension` which pops open a share sheet.

There is an alternative service identifier `com.apple.share.Messages.window` which puts the text directly in the messages window. But this services in only available on macOS ?? and later.

## Changelog

- 21 May 2024: Updated to revert to the original service identifier.
- 14 May 2024: New version using PopClip internal sharing integration.
- 2014-2019: Various updates to keep up wih macOS changes.
- 3 May 2013: Initial release using 'MessageMaker.app' in bundle.
