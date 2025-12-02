# Terminal

Runs the selected text as a command in the current terminal window.

One can choose either default Terminal, [iTerm2](https://iterm2.com/),
[Warp](https://www.warp.dev/), [Ghostty](https://ghostty.org/), or 
[kitty](https://sw.kovidgoyal.net/kitty/).

## Features

- Execute selected text as a command in your terminal of choice
- Optionally prepend text before the selected command
- Optionally append text after the selected command
- Run commands in a new tab instead of the current tab

### Usage Examples

1. **Basic command execution**: Select a command like `ls -la` and run it
   directly.

2. **Prepend example**: Set "Prepend Command" to `sudo` to run selected commands
   with sudo privileges.

3. **Append example**: Set "Append Command" to `| grep keyword` to filter
   command output.

4. **Combining prepend and append**: Set "Prepend Command" to `sudo` and "Append
   Command" to `| tee output.log` to run with sudo and save output to a file.

## Configuration

In the extension settings, you can configure:

- Terminal Emulator: Choose between Terminal, iTerm2, Warp, Ghostty, or kitty.
- Prepend Command: Text to insert before the selected text (optional)
- Append Command: Text to insert after the selected text (optional)
- Use New Tab: Opens command in a new tab instead of the current tab

### About

Original extension and icon created by
[James Smith](https://twitter.com/smithjw/status/244757999665700864). iTerm2
option added by [honnix](https://github.com/honnix). Warp support added by
Oliver using script from
[parterburn](https://gist.github.com/parterburn/e832b9090ee35eb830529de8bd978b82).
Prepend/append functionality added by Shayon Pal. Ghosstty support added by
[Licardo](https://github.com/L1cardo). Kitty support added by 
[herbhuang](https://github.com/herbhuang).


## Changelog

- 28 Nov 2025: Add kitty support.
- 20 Oct 2025: Add Ghostty support.
- 29 May 2025: Added 'Use New Tab' option to run commands in a new terminal tab;
  added prepend/append functionality to customize command execution.
- 9 Nov 2024: Remove needless line from iTerm2 script.
- 21 May 2024: Add filter keywords for directory and update readme.
- 28 Mar 2024: Removed the legacy iTerm option and added Warp Terminal.
- 19 Feb 2016: Added third config option to support iTerm2 v2.9 and above, which
  has breaking AppleScript changes.
- 2 Jun 2015: Separated the two sides into separate actions. Having both apps
  referenced in one script was causing problems.
- 12 Nov 2012: Original release as "Run Command".
