# Layout Fix

Fix text typed with the wrong keyboard layout.

## How It Works

Select text that was typed on the wrong layout, then click **Layout Fix** in
PopClip. The extension reads your current macOS keyboard layout and converts
the text automatically.

**Auto mode** (default): detects whether the text is Latin or the target
script and converts in the appropriate direction. You can also force a
direction in the extension settings.

## Examples

| Input | Output | Direction |
|-------|--------|-----------|
| `ghbdtn` | `привет` | Latin → Russian |
| `руддщ` | `hello` | Russian → Latin |
| `asd!@#$%^&*()` | `фыв!"№%:,.;()` | Latin → Russian |
| `geia` | `γεια` | Latin → Greek |

## Supported Layouts

183 non-Latin macOS keyboard layouts, including Russian, Ukrainian,
Belarusian, Greek, Hebrew, Arabic, Bulgarian, Serbian, Georgian, Hindi,
Thai, Korean, Japanese, and many more.

The extension auto-detects your active layout at runtime, so one installation
works across all your keyboard layouts.

## Settings

- **Direction**: Auto / Latin → Layout / Layout → Latin

## Requirements

- macOS 13+ (PopClip 2024.5+)
- Python 3 (stock on macOS, used for Unicode NFC normalization)
- No other dependencies

## Technical Details

- Pure zsh with minimal stock macOS tool dependencies
- Layout catalog extracted from macOS via `UCKeyTranslate`
- Punctuation and symbols mapped to match physical key positions
- Unicode NFC normalization handles decomposed characters (e.g., й)
- Hardcoded fallback maps for popular layouts when catalog is unavailable

## Changelog

- 14 Jul 2026: Initial release.
