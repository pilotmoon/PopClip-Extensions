# GitHub Hop

By [ajanlab](https://github.com/ajanlab)

Select any text → instantly jump to its GitHub repo homepage.

## Features

- **owner/repo** (e.g. `facebook/react`) → instant jump, zero latency
- **Project name** (e.g. `lodash`) → resolves via GitHub Search API to the best matching repo
- **Author name** (e.g. `@ajanlab`) → auto-strip `@`, search GitHub
- **Fallback** → API failure / rate limit / timeout → gracefully degrades to GitHub search

## Requirements

- PopClip 4631 (2023 or later)
- macOS 10.15+
- Internet connection (for API resolution and browser open)

## Usage

Select any text in any app, then click the GitHub icon in PopClip's toolbar.

## Changelog

### 1.0.0 (2026-07-14)
- Initial release
- owner/repo format → direct jump
- Project name → GitHub Search API resolution with smart matching
- @username → auto-strip and search
- Transparent fallback to GitHub search page on any API failure
