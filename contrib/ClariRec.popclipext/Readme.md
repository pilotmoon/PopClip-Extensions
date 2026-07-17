# ClariRec

Translate the selected text with [ClariRec](https://clarirec.com), an OCR and translation utility for macOS.

## Usage

Select text in any app and click the ClariRec button in the PopClip bar. The translation appears in ClariRec's compact Mini HUD near the pointer, without stealing focus from the app you are working in.

The translation uses whichever engine you have configured in ClariRec:

- macOS system translation (macOS 15 Sequoia or later, works out of the box)
- Apple Intelligence (Macs that support it, running macOS 26 Tahoe or later)
- A local on-device model (optional download, fully offline)
- Your own API key (BYOK): DeepL, OpenAI, Anthropic, DeepSeek, GLM, SiliconFlow, Grok, OpenRouter, and more

Change the target language or engine in ClariRec's settings, or directly from the HUD.

## Requirements

- [ClariRec](https://apps.apple.com/us/app/clarirec/id6757385283?mt=12) (free on the Mac App Store)
- The extension invokes ClariRec's "Translate with ClariRec" macOS Service, so ClariRec must have been launched at least once for the service to register.

## Notes

This extension uses the standard macOS Services mechanism — no Accessibility permission, no scripts.

## Credits

Extension by Harry Chu and the ClariRec team.

## Changelog

### 1.0 (2026-07-16)

- Initial release: translate selected text via ClariRec's macOS Service.
