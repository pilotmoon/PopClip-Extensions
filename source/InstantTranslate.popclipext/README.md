# Instant Translate

Translate the selected word or short phrase instantly within PopClip, using DeepL.

The extension needs your own DeepL API key. The free plan allows 500,000 characters per month.

## Setting up your DeepL API key

1. Go to the [DeepL API plans](https://www.deepl.com/pro-api) page and sign up for **DeepL API Free**. DeepL asks for a credit card to verify your identity, but the free plan is not charged.
2. Once signed in, open the [API Keys](https://www.deepl.com/your-account/keys) tab of your account and copy your key. Free keys end in `:fx`.
3. In PopClip's settings, click the Instant Translate extension's settings button, and paste the key into **DeepL API Key**.

DeepL API Pro keys work too.

## Changelog

- 9 Nov 2026: Switched from Microsoft Translator to DeepL, using your own DeepL API key entered in the extension's settings. The previous shared Microsoft key has been withdrawn. Converted to the modern Config.ts format, with clearer error messages.
- 20 Apr 2022: Increased the language list to the latest supported languages.
- 20 Apr 2022: Rewrote the extension in JavaScript and moved to version 3 of the Translator API (it was using version 2). Response times are faster because the key is now used directly, instead of first being exchanged for an access token.
- 20 Apr 2022: Updated for Python 3, thanks to [harrtho](https://github.com/harrtho).
- 30 Apr 2021: Stopped working because of an SSL error that couldn't be fixed quickly, so the extension was removed from the index.
- 22 Apr 2015: Updated to use credentials issued by a server.
- 21 Apr 2015: [chenggiant](https://github.com/chenggiant) modified the original to use the official Microsoft Translator API. Further modifications by Nick Moore.
- The original Instant Translate (a.k.a. Better Translate) was developed by [harmy](http://harmy.github.io). Around March/April 2015 Google changed their back end, which broke it. The original relied on undocumented Google endpoints rather than the paid API.
