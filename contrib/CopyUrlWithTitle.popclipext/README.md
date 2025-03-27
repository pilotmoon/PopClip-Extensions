# Copy URL with Title

By Omar Shahine [https://omar.shahine.com](https://omar.shahine.com)

A PopClip extension that copies a URL with its page title as an HTML or Markdown link.

## Features

- Copies URLs as HTML links with page titles
- Copies URLs as Markdown links with page titles
- Automatically fetches page titles from URLs
- Falls back to using URL as title if fetching fails
- Works with any URL, not just the current browser tab
- Shows error messages in clipboard for debugging

## Usage

1. Select a URL in any application
2. Click the PopClip icon
3. Choose either:
   - "Copy as HTML Link" to copy as `<a href="url">title</a>`
   - "Copy as Markdown Link" to copy as `[title](url)`

## Requirements

- PopClip 4151 or later
- Internet connection (to fetch page titles)

## Installation

1. Download the `CopyUrlWithTitle.popclipextz` file
2. Double-click to install the extension
3. Restart PopClip if it's running

## Usage

1. Select a URL in any application
2. Click the PopClip icon
3. Choose either:
   - "Copy as HTML Link" to copy as `<a href="url">title</a>`
   - "Copy as Markdown Link" to copy as `[title](url)`

## Development

The extension is built using:
- JavaScript with async/await
- Axios for HTTP requests
- PopClip's JavaScript environment

## Changelog

### 1.0.0 (2024-03-23)
- Initial release
- Added HTML link copying with page titles
- Added Markdown link copying with page titles
- Added automatic page title fetching
- Added error handling and fallback to URL as title

## License

MIT License

Copyright (c) 2025 omarshahine

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
