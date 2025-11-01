# Quick Navigate

Navigate to preset websites with selected text. Simplified version inspired by JSON Tailor.

## Features

- 🚀 **Quick Navigation**: Select text and choose from your preset websites
- 📋 **Selection Dialog**: Click to see all your configured URLs and pick one
- ☁️ **iCloud Sync**: Store your configuration in iCloud Drive for seamless sync across devices
- 🌐 **Browser Selection**: Choose your preferred browser
- 📝 **Simple Configuration**: Easy-to-understand JSON configuration format
- ⚡ **Skip Dialog Option**: Enable to always use the first configuration without dialog

## Installation

1. Double-click the `QuickNavigate.popclipext` package to install
2. Configure the extension in PopClip preferences

## Configuration

### Step 1: Create Configuration File

Create a JSON file (e.g., `quicknavigate-config.json`) with your navigation targets:

```json
[
  {
    "name": "Google Search",
    "url": "https://www.google.com/search?q={text}",
    "description": "在 Google 搜索选中的文本"
  },
  {
    "name": "GitHub Search",
    "url": "https://github.com/search?q={text}&type=code",
    "description": "在 GitHub 代码中搜索"
  },
  {
    "name": "Your Custom Site",
    "url": "https://example.com/search?query={text}",
    "description": "Optional description shown in selection dialog"
  }
]
```

**Configuration Fields:**
- `name` (required): Short name for this configuration
- `url` (required): URL template with `{text}` or `***` placeholder
- `description` (optional): Helpful description shown in selection dialog

**URL Format:**
- Use **human-readable URLs** (no need to URL-encode)
- Use `{text}` or `***` as placeholder for selected text
- The selected text will be automatically URL-encoded
- Complex URLs with JSON parameters are supported

### Step 2: Configure Extension

1. Open PopClip preferences → Extensions → Quick Navigate
2. Set **Configuration File Path**:
   - **Local**: `~/Documents/quicknavigate-config.json`
   - **iCloud**: `~/Library/Mobile Documents/com~apple~CloudDocs/quicknavigate-config.json`
3. Choose your preferred **Browser**
4. (Optional) Enable **Skip Selection Dialog** to always use the first configuration without showing the selection menu

### iCloud Sync Setup

To sync your configuration across devices using iCloud:

1. Save your config file to iCloud Drive:
   ```bash
   ~/Library/Mobile Documents/com~apple~CloudDocs/quicknavigate-config.json
   ```

2. In PopClip preferences, set the Configuration File Path to the iCloud path above

3. The same configuration will be available on all your Macs with iCloud Drive enabled

## Usage

### Standard Usage (Show Selection Dialog)
1. Select any text
2. Click the Quick Navigate action in PopClip
3. Choose from your configured navigation targets in the dialog
4. Opens the selected URL with the selected text

### Quick Mode (Skip Dialog)
1. Enable **Skip Selection Dialog** in extension settings
2. Select any text
3. Click the Quick Navigate action
4. Automatically opens the first configured URL with the selected text

## Configuration Examples

### Example 1: Simple Search
```json
{
  "name": "Google Search",
  "url": "https://www.google.com/search?q={text}",
  "description": "在 Google 搜索选中的文本"
}
```

### Example 2: Complex Grafana Query (Human Readable!)
```json
{
  "name": "Grafana Logs",
  "url": "https://your-grafana.com/explore?schemaVersion=1&panes={\"queries\":[{\"expr\":\"{app=\\\"my-app\\\"} |= `{text}`\",\"queryType\":\"range\"}],\"range\":{\"from\":\"now-7d\",\"to\":\"now\"}}",
  "description": "搜索应用日志（最近7天）"
}
```

**Note**: URLs are written in human-readable format with proper JSON syntax. The script handles encoding automatically.

### Example 3: Internal Documentation
```json
{
  "name": "Company Wiki",
  "url": "https://wiki.company.com/search?q={text}"
}
```

### Example 4: Translation Service
```json
{
  "name": "DeepL Translate",
  "url": "https://www.deepl.com/translator#en/zh/{text}"
}
```

## Complete Example Configuration

See `example-config.json` for a complete working example with multiple navigation targets including:
- Google Search
- Grafana Logs
- GitHub Search
- Stack Overflow
- YouTube Search

## Troubleshooting

### "Configuration file not found"
- Verify the file path is correct
- Use absolute path or `~` for home directory
- For iCloud, ensure iCloud Drive is enabled

### "Invalid JSON format"
- Validate your JSON using [jsonlint.com](https://jsonlint.com/)
- Check for missing commas, brackets, or quotes
- Ensure all required fields (`name` and `url`) are present

### Extension doesn't appear
- Verify PopClip version is 4688 or higher
- Try reinstalling the extension
- Check PopClip preferences to ensure the extension is enabled

## Version History

### 1.0 (2025-10-31)
- Initial release
- Basic navigation functionality
- iCloud sync support
- Multi-browser support
- Option key for multiple configurations

## Credits

Inspired by [JSON Tailor](https://github.com/your-repo/JSONTailor) by Yimin Wang.

## License

Same as PopClip-Extensions repository.

