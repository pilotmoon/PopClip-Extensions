# Changelog

## [4.0.0] - 2025-10-15

### 🎉 Major Changes

#### File-Based Configuration System
- **NEW**: Configuration file path instead of inline JSON input
- **NEW**: Edit configurations in any text editor with syntax highlighting and formatting
- **NEW**: Cloud sync support via iCloud Drive / Dropbox
- **NEW**: Cross-device configuration sharing
- **NEW**: Real-time updates - changes to config file take effect immediately

### ✨ Enhancements

- **Better Editing Experience**: Use VS Code, Sublime, or any editor instead of single-line input
- **Version Control Friendly**: Track configuration changes with Git
- **Team Collaboration**: Share config files via cloud or Git
- **Multi-Device Sync**: Same configurations on all your Macs automatically
- **No JSON Formatting Hassles**: Edit formatted multi-line JSON, no need to convert to single line

### 📁 New Files

- `example-config.json` - Example configuration file with working test APIs
- Updated `README.md` - Comprehensive guide for file-based configuration
- Updated `QUICKSTART.md` - Quick setup guide with sync instructions

### 🔧 Configuration Changes

**Before (v3.0):**
- Single-line JSON input in PopClip settings
- Manual editing with no formatting
- No easy way to sync across devices

**After (v4.0):**
- Specify path to JSON configuration file
- Edit with your favorite editor
- Put file in iCloud/Dropbox for auto-sync

**Migration Example:**

Old way (inline JSON):
```
[{"name":"Get User","command":"curl ..."}]
```

New way (file path):
1. Create file: `~/Documents/jsontailor-config.json`
2. Edit with formatting:
```json
[
  {
    "name": "Get User",
    "command": "curl ..."
  }
]
```
3. Set path in PopClip: `~/Documents/jsontailor-config.json`

### 🎯 Use Cases Enabled

1. **Cloud Sync**: Put config in iCloud Drive, sync to all Macs
2. **Version Control**: Track API configurations in Git
3. **Team Sharing**: Share standardized configs via cloud/Git
4. **Easy Editing**: Full IDE support with syntax highlighting
5. **Multiple Profiles**: Switch between dev/prod configs easily

### 📖 Configuration File Locations

**Local (no sync):**
```
~/Documents/jsontailor-config.json
```

**iCloud Drive (auto-sync):**
```
~/Library/Mobile Documents/com~apple~CloudDocs/jsontailor-config.json
```

**Dropbox (auto-sync):**
```
~/Dropbox/jsontailor-config.json
```

**Git repository:**
```
~/Projects/my-configs/jsontailor-config.json
```

### 💡 Benefits

- ✅ **Better UX**: Edit with proper formatting and syntax highlighting
- ✅ **Sync Anywhere**: iCloud/Dropbox auto-sync to all devices
- ✅ **Version Control**: Track changes with Git
- ✅ **Team Friendly**: Share configs easily
- ✅ **Real-time**: Changes take effect immediately
- ✅ **Validation**: Editors can validate JSON syntax
- ✅ **No Length Limit**: Description field no longer limited to 500 chars

### 🔄 Backward Compatibility

**Breaking Changes:**
- Configuration method changed from inline JSON to file path
- Users need to create a configuration file and specify its path
- Previous inline JSON configurations will not be migrated automatically

**Migration Steps:**
1. Copy your old JSON configuration
2. Create a new file (e.g., `~/Documents/jsontailor-config.json`)
3. Paste and format your configuration
4. Set the file path in Extension Options

### 🛠️ Technical Improvements

- Shell script reads from file path specified in options
- Supports `~` home directory expansion
- Better error messages for file not found / invalid JSON
- File is read on each use (no caching) for instant updates

---

## [3.0.0] - Previous Version

### Features
- Multiple cURL configuration support
- Interactive selection dialog
- Browser selection
- Inline JSON configuration

---

## [2.0.0] - Previous Version

### Features
- Direct JSON Tailor integration
- Single cURL command support with Option key
- Browser selection

---

## [1.0.0] - Initial Release

### Features
- Direct text to JSON Tailor
- Basic browser integration
