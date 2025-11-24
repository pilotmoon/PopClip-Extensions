# OpenAI TTS PopClip Extension

This is a PopClip extension that lets you convert selected text into speech using OpenAI’s text-to-speech API.

## Features

- Supports custom TTS models (like `tts-1`, `tts-1-hd`, or any user-defined model)
- Lets you pick different voices (such as alloy, echo, fable, onyx, nova, shimmer, or any custom voice name)
- Allows custom API endpoints (official API, proxy servers, self-hosted services, etc.)
- Multiple audio formats: mp3, opus, aac, flac
- Adjustable speech speed (0.25x – 4.0x)
- Secure API key storage (saved in your system keychain)
- Automatically plays the generated audio

## Installation

1. Double-click the `OpenAI TTS.popclipext` folder
2. PopClip will automatically detect it and prompt you to install
3. Click "Install Extension" to confirm installation

## Configuration

After installation, you'll need to configure the following options:

### Required

- **OpenAI API Key**: Your OpenAI API key (securely stored in the keychain)

### Optional

- **Base URL**: The API base URL (default: `https://api.openai.com/v1`)
  - Official API: `https://api.openai.com/v1`
  - Proxy service: `https://proxy.example.com/v1`
  - Self-hosted service: `http://localhost:8000/v1`
- **Model**: TTS model (default: `tts-1`)
  - `tts-1`: Standard quality, fast speed
  - `tts-1-hd`: High-definition quality, slower speed
  - Supports any custom model name
- **Voice**: Voice name (default: `alloy`)
  - `alloy`: Neutral
  - `echo`: Male
  - `fable`: British male
  - `onyx`: Deep male
  - `nova`: Young female
  - `shimmer`: Female
  - Supports custom voice names
- **Audio Format**: Audio format (default: `mp3`)
- **Speed**: Speech speed (default: `1.0`)

## How to Use

1. Select any text
2. Click the "OpenAI TTS" button in PopClip
3. The system will automatically play the generated audio

## Supported Services

### OpenAI Official API

- URL: `https://api.openai.com/v1`
- Requires OpenAI API key

### Proxy Services

- Supports any OpenAI-compatible proxy service
- Just set the appropriate `base_url`

### Self-Hosted Services

- Supports locally hosted or private OpenAI-compatible services
- For example: LocalAI, FastChat, vLLM, etc.

## How to Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign in or create an account
3. Navigate to the API Keys page
4. Create a new API key
5. Copy your key and enter it in the PopClip extension settings

## Notes

- You need a valid API key and, if applicable, enough credits
- There are text length limitations (see the API documentation you’re using)
- Generated audio files are automatically cleaned up, so they won’t take up disk space
- If using a proxy service, make sure your network connection is stable

## Troubleshooting

If you encounter problems:
1. Check that your API key is correct
2. Make sure your API service has enough credits (if required)
3. Double-check that the Base URL is correct
4. Verify that the selected model and voice are supported
5. Check your network connection
6. View the PopClip debug log

## Changelog

### Latest Version

- ✅ Added support for custom Base URLs
- ✅ Custom model and voice names are now supported
- ✅ API key is securely stored
- ✅ Supports a variety of OpenAI-compatible services