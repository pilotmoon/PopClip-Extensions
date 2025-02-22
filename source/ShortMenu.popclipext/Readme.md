# Short Menu PopClip Extension

A PopClip extension to shorten URLs using [Short Menu](https://shortmenu.com/).

The extension has a single action that shortens all web URLs detected in the
text using the configured Short Menu account. If there are no URLs in the text,
the action does not appear.

The extension requires a Short Menu account and does not need the Mac app to be
installed locally.

## Settings

- **API Key:** Create an API key for your Short Menu account at
  <https://app.shortmenu.com/settings/api-keys> and configure it in the
  extension's settings.

- **Domain:** Specify the domain to use for shortening URLs. The default, if
  left blank, is `shm.to`. If you have enabled a custom domain on your Short
  Menu account, you can enter it here.

## About

Author: Nick Moore

Implemented using the Short Menu public API, documented at
<https://docs.shortmenu.com/api-reference/introduction>.

## Changelog

- 2025-02-22: Extension rewritten to use the Short Menu API directly. (Short
  Menu desktop app no longer supports the Services menu.)
- 2020-12-07: Supported Setapp version of Short Menu.
- 2013-04-29: Original release.
