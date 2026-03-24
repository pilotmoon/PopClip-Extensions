# LLMTranslate

Translate selected text using OpenAI-compatible LLM APIs in PopClip.

Based on the original InstantTranslate extension by Nick Moore.

## Features

- Translate selected text (1-1000 characters) to 130+ languages
- Powered by OpenAI-compatible APIs (OpenAI, Azure OpenAI, or any OpenAI-compatible service)
- Configurable API endpoint and model selection
- Translation results displayed in PopClip popup
- Secure API key storage in PopClip preferences
- Comprehensive error handling with user-friendly messages

## Setup

1. Open PopClip Preferences and find LLMTranslate
2. Click the settings icon to configure:
   - **API Key**: Your OpenAI-compatible API key (stored securely by PopClip)
   - **API Endpoint**: Full URL of your API endpoint (default: `https://api.openai.com/v1`)
   - **Model**: The model to use (default: `gpt-4.1-mini`).
   - **Destination Language**: Choose your target language from the dropdown

## Configuration Options

### API Key
Your OpenAI-compatible API key. This is stored securely by PopClip and is only used to authenticate with your chosen API provider.

### API Endpoint
The full URL of your OpenAI-compatible API endpoint. Examples:
- **OpenAI**: `https://api.openai.com/v1`
- **Azure OpenAI**: `https://test.openai.azure.com/openai/v1`
- **Local/Custom**: `http://localhost:8000/v1`

Provide the complete URL including protocol (http:// or https://).

### Model
The language model to use for translation. Examples:
- `gpt-4.1-mini` (default)
- `gpt-5-nano`
- Custom model names for other providers

The default model is `gpt-4.1-mini` with both good quality and speed.

### Destination Language
Select from 130+ supported languages including:
- Common languages: English, Spanish, French, German, Chinese, Japanese, Korean, Arabic
- Regional variants: English (US/UK), Portuguese (Brazil/Portugal), French (France/Canada)
- And many more

## Usage

1. Select text (1-500 characters) in any application
2. Click the LLMTranslate button in the PopClip bar
3. The translation will be displayed in a PopClip popup
4. The popup will automatically close after showing the result

The translation is performed using your configured LLM provider and displayed directly in the PopClip UI.

## Supported Text Length

This extension works with selections of 1-500 characters. For longer texts, consider using the full interface of your chosen LLM provider.

## API Key Security

Your API key is stored securely in PopClip's encrypted preferences system. PopClip never logs or exposes your API key, and it's only transmitted to your configured API endpoint for translation requests.

## Customization

### System Prompt
The extension uses a system prompt optimized for translation:
> "You are a professional translator. Provide accurate, natural-sounding translations. Keep the translation concise and appropriate for the context. Only return the translated text without any additional explanation or formatting."

## Requirements

- PopClip 4586 or later (2024.5+)
- An OpenAI-compatible API key
- Internet connection

## Credits

- Icon based on the InstantTranslate icon
- Original InstantTranslate extension developed by [harmy](http://harmy.github.io), modified by [chenggiant](https://github.com/chenggiant), and further updated by Nick Moore
- Configuration pattern inspired by [OpenAIChat](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/OpenAIChat.popclipext) extension
- LLMTranslate extension developed by wenhe

## License

This extension is released under the MIT License. See the LICENSE file for details.
