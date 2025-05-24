# Bitly

A PopClip extension to shorten URLs using [Bitly](https://bitly.com/).

The extension defines a single action called "Bitly", which is enabled when the input contains one or more web URLs. The action shortens all the detected URLs using the logged-in Bitly account, and outputs the result to be pasted or copied.

If you try to shorten an already-shortened Bitly link, you'll get an error.

### Requirements

Requires PopClip 2021.11 or above, and a Bitly account.

### Author

Nick Moore

### Notes

Implemented using the Bitly public API, documented at https://dev.bitly.com.

The SVG icon is from [IconFinder](https://www.iconfinder.com/icons/1298728/bitly_icon).

## Changelog

### 1 Nov 2021

* Rewritten using PopClip's JavaScript API, for compatibility with macOS Monterey.
* Now shortens all URLs detected in the text, instead of just one.
* Changed icon to a Bitly logo.

### 5 Jun 2020

* Updated to fix login failure.

### 7 May 2020

* Updated for Bitly API v4.

### 19 Feb 2013

* Initial release (written in PHP).
