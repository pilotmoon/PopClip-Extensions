# JSON Tailor PopClip Extension

A PopClip extension that provides two ways to handle text data with JSON Tailor.

## Features

### Primary Function
- **JSON Tailor**: Load selected text directly into JSON Tailor website for editing and formatting

### Alternative Function (Option ⌥ key)
- **Choose cURL → JSON Tailor**: Select from configured cURL commands, send text, then open the response in JSON Tailor
- **File-based Configuration**: Edit configurations in your favorite editor with syntax highlighting
- **Cloud Sync**: Put config file in iCloud/Dropbox to sync across all your devices

## 🚀 Quick Start

### 1. Copy Example Configuration

```bash
# Copy example config to Documents folder
cp example-config.json ~/Documents/jsontailor-config.json
```

Or put it in iCloud Drive for sync:
```bash
cp example-config.json ~/Library/Mobile\ Documents/com~apple~CloudDocs/jsontailor-config.json
```

### 2. Configure Extension

- Right-click JSON Tailor icon in PopClip
- Select "Extension Options..."
- Set **Configuration File Path** to:
  - `~/Documents/jsontailor-config.json` (local)
  - `~/Library/Mobile Documents/com~apple~CloudDocs/jsontailor-config.json` (iCloud sync)

### 3. Test It!

- Select text "1"
- Hold Option (⌥) + Click JSON Tailor
- Choose "Get User" from dialog
- See result in JSON Tailor!

## Usage

### Default Mode (No Option Key)
1. Select any text
2. Click JSON Tailor button in PopClip
3. Text opens in JSON Tailor in browser ✨

### cURL Mode (Hold Option ⌥)
1. Select text
2. **Hold Option (⌥) key** + Click JSON Tailor
3. Choose from your configured cURL commands
4. Request executes and response opens in JSON Tailor

## ⚙️ Configuration

### Configuration File Format

Create a JSON file with an array of configurations:

```json
[
  {
    "name": "Display Name",
    "command": "curl command with *** placeholder"
  }
]
```

### Example Configuration

```json
[
  {
    "name": "Get User by ID",
    "command": "curl -X GET 'https://jsonplaceholder.typicode.com/users/***' -H 'Accept: application/json'"
  },
  {
    "name": "Post Data",
    "command": "curl -X POST -H 'Content-Type: application/json' -d '***' https://httpbin.org/post"
  },
  {
    "name": "Dev API",
    "command": "curl -X POST -H 'Content-Type: application/json' -H 'Authorization: Bearer YOUR_TOKEN' -d '***' https://dev-api.example.com/test"
  }
]
```

### Configuration File Locations

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

### Editing Your Configuration

1. **Open in VS Code / Any Editor:**
   ```bash
   code ~/Documents/jsontailor-config.json
   ```

2. **Edit with syntax highlighting and formatting**

3. **Save** - Changes take effect immediately, no need to reconfigure PopClip!

## 💡 cURL Command Examples

### Basic GET Request
```json
{
  "name": "Get User",
  "command": "curl -X GET 'https://api.example.com/users/***' -H 'Accept: application/json'"
}
```
**Usage**: Select "123" → Option+Click → Gets user with ID 123

### POST with JSON Body
```json
{
  "name": "Create Item",
  "command": "curl -X POST -H 'Content-Type: application/json' -d '***' https://api.example.com/items"
}
```
**Usage**: Select `{"name":"test"}` → Option+Click → Creates item

### With Authentication
```json
{
  "name": "Authenticated Request",
  "command": "curl -X POST -H 'Content-Type: application/json' -H 'Authorization: Bearer YOUR_TOKEN' -d '***' https://api.example.com/secure"
}
```

### PUT Request
```json
{
  "name": "Update User",
  "command": "curl -X PUT -H 'Content-Type: application/json' -d '***' https://api.example.com/users/123"
}
```

### GET with Query Parameters
```json
{
  "name": "Search Users",
  "command": "curl -X GET 'https://api.example.com/users?search=***' -H 'Accept: application/json'"
}
```

## 🎯 Use Cases

1. **API Testing**: Quickly test different API endpoints
2. **Multiple Environments**: Different configs for dev/staging/prod
3. **Team Sharing**: Share config file via Git/Cloud
4. **Cross-Device Sync**: Same configurations on all your Macs
5. **Version Control**: Track configuration changes with Git

## 📝 Configuration Tips

### Organizing Configurations

**By Environment:**
```json
[
  {"name": "Dev - Get User", "command": "curl ... dev-api.com ..."},
  {"name": "Dev - Create User", "command": "curl ... dev-api.com ..."},
  {"name": "Prod - Get User", "command": "curl ... api.com ..."},
  {"name": "Prod - Create User", "command": "curl ... api.com ..."}
]
```

**By Function:**
```json
[
  {"name": "Auth - Login", "command": "curl ..."},
  {"name": "Auth - Logout", "command": "curl ..."},
  {"name": "User - Get", "command": "curl ..."},
  {"name": "User - Create", "command": "curl ..."}
]
```

### Best Practices

✅ **Use Descriptive Names**: "Dev - Get User" instead of "API1"
✅ **Test Commands First**: Test in Terminal before adding to config
✅ **Version Control**: Keep config in Git repository
✅ **Cloud Sync**: Use iCloud/Dropbox for multi-device sync
✅ **Document API Keys**: Add comments (JSON doesn't support comments, but you can use a README)

### Testing cURL Commands

```bash
# 1. Test in Terminal with real data
curl -X GET 'https://jsonplaceholder.typicode.com/users/1' -H 'Accept: application/json'

# 2. If it works, replace the value with ***
# 3. Add to your config file:
{
  "name": "Get User",
  "command": "curl -X GET 'https://jsonplaceholder.typicode.com/users/***' -H 'Accept: application/json'"
}
```

## 🔄 Syncing Across Devices

### Option 1: iCloud Drive (Recommended for Apple ecosystem)

1. **On first Mac:**
   ```bash
   # Create config in iCloud
   cp example-config.json ~/Library/Mobile\ Documents/com~apple~CloudDocs/jsontailor-config.json
   
   # Edit it
   code ~/Library/Mobile\ Documents/com~apple~CloudDocs/jsontailor-config.json
   ```

2. **Set path in PopClip:**
   ```
   ~/Library/Mobile Documents/com~apple~CloudDocs/jsontailor-config.json
   ```

3. **On other Macs:**
   - Install the extension
   - Set the same iCloud path in Extension Options
   - Configurations auto-sync! ✨

### Option 2: Dropbox

1. **Put config in Dropbox:**
   ```bash
   cp example-config.json ~/Dropbox/jsontailor-config.json
   ```

2. **Set path in PopClip:**
   ```
   ~/Dropbox/jsontailor-config.json
   ```

### Option 3: Git Repository

1. **Keep config in a Git repo:**
   ```bash
   cd ~/Projects/my-configs
   cp example-config.json jsontailor-config.json
   git add jsontailor-config.json
   git commit -m "Add JSON Tailor config"
   git push
   ```

2. **On other machines:**
   ```bash
   git clone your-repo ~/Projects/my-configs
   ```

3. **Set path to repo file:**
   ```
   ~/Projects/my-configs/jsontailor-config.json
   ```

## ❓ Troubleshooting

### "Configuration file not found"
- Check the path is correct (use absolute path with ~)
- Make sure file exists: `ls -la ~/Documents/jsontailor-config.json`
- Verify file permissions: `chmod 644 ~/Documents/jsontailor-config.json`

### "Invalid JSON format"
- Validate JSON: `cat ~/Documents/jsontailor-config.json | python3 -m json.tool`
- Or use online validator: https://jsonlint.com

### Dialog doesn't appear when holding Option
- Make sure config file path is set in Extension Options
- Verify file contains at least one valid configuration
- Check file has both "name" and "command" fields

### "No response received" error
- Test cURL command in Terminal first
- Check network connection
- Verify API endpoint is accessible

### Changes to config file not reflected
- Config file is read on each use, so changes should be immediate
- Make sure you saved the file
- Verify the file path in Extension Options is correct

## 📚 Advanced Usage

### Using Environment Variables

You can reference environment variables in your config:

```json
{
  "name": "Authenticated API",
  "command": "curl -X POST -H 'Authorization: Bearer $MY_API_TOKEN' -d '***' https://api.example.com/data"
}
```

Then set the variable:
```bash
export MY_API_TOKEN="your-token-here"
```

### Multiple Config Files

You can maintain different config files and switch between them:

```bash
# Development configs
~/Documents/jsontailor-dev.json

# Production configs
~/Documents/jsontailor-prod.json

# Personal configs
~/Documents/jsontailor-personal.json
```

Change the path in Extension Options to switch between them.

## Version History

- **v4.0**: File-based configuration with cloud sync support
- **v3.0**: Added support for multiple cURL configurations with selection dialog
- **v2.0**: Added cURL support with Option key
- **v1.0**: Initial release with direct JSON Tailor integration

## Author

Yimin Wang - [GitHub](https://github.com/Wangggym)
