# JSON Tailor - Quick Start Guide

## 🚀 5-Minute Setup

### Step 1: Install Extension
Double-click `JSONTailor.popclipext` to install in PopClip.

### Step 2: Copy Example Configuration
Open Terminal and run:
```bash
cp example-config.json ~/Documents/jsontailor-config.json
```

Or for iCloud sync:
```bash
cp example-config.json ~/Library/Mobile\ Documents/com~apple~CloudDocs/jsontailor-config.json
```

### Step 3: Configure PopClip
1. Right-click JSON Tailor icon in PopClip
2. Select "Extension Options..."
3. Set **Configuration File Path** to one of:
   - Local: `~/Documents/jsontailor-config.json`
   - iCloud: `~/Library/Mobile Documents/com~apple~CloudDocs/jsontailor-config.json`
4. Click "Apply"

### Step 4: Test It!
1. Select text: `1`
2. Hold **Option (⌥)** + Click JSON Tailor
3. Choose "JSONPlaceholder - Get User"
4. See result in JSON Tailor! 🎉

---

## 📝 Basic Usage

### Direct Mode (No Configuration Needed)
1. Select any text
2. Click JSON Tailor in PopClip
3. Text opens in JSON Tailor ✨

### cURL Mode (Requires Configuration)
1. Select text
2. **Hold Option (⌥)** + Click JSON Tailor
3. Choose a cURL configuration
4. Response opens in JSON Tailor

---

## ⚙️ Editing Your Configuration

### Using VS Code
```bash
code ~/Documents/jsontailor-config.json
```

### Using Any Text Editor
```bash
open -a TextEdit ~/Documents/jsontailor-config.json
```

### Configuration Format
```json
[
  {
    "name": "Configuration Name",
    "command": "curl command with *** placeholder"
  }
]
```

**Important**: Use `***` as placeholder for selected text.

---

## 💡 Example Configurations

### Get Request
```json
{
  "name": "Get User by ID",
  "command": "curl -X GET 'https://jsonplaceholder.typicode.com/users/***' -H 'Accept: application/json'"
}
```

### Post Request
```json
{
  "name": "Create Item",
  "command": "curl -X POST -H 'Content-Type: application/json' -d '***' https://httpbin.org/post"
}
```

### With Authentication
```json
{
  "name": "Secure API",
  "command": "curl -X POST -H 'Content-Type: application/json' -H 'Authorization: Bearer YOUR_TOKEN' -d '***' https://api.example.com/secure"
}
```

---

## 🔄 Syncing Across Devices

### iCloud Drive (Recommended)

**On all your Macs:**
1. Put config in iCloud:
   ```bash
   cp example-config.json ~/Library/Mobile\ Documents/com~apple~CloudDocs/jsontailor-config.json
   ```

2. Set path in PopClip Extension Options:
   ```
   ~/Library/Mobile Documents/com~apple~CloudDocs/jsontailor-config.json
   ```

3. **Edit on any Mac** → Auto-syncs to all devices! ✨

### Dropbox

1. Put config in Dropbox:
   ```bash
   cp example-config.json ~/Dropbox/jsontailor-config.json
   ```

2. Set path in PopClip:
   ```
   ~/Dropbox/jsontailor-config.json
   ```

---

## ❓ Troubleshooting

### "Configuration file not found"
Check the file exists:
```bash
ls -la ~/Documents/jsontailor-config.json
```

If not, copy the example:
```bash
cp example-config.json ~/Documents/jsontailor-config.json
```

### "Invalid JSON format"
Validate your JSON:
```bash
cat ~/Documents/jsontailor-config.json | python3 -m json.tool
```

Or use: https://jsonlint.com

### Dialog doesn't appear
- Make sure config file path is set in Extension Options
- Verify file contains valid JSON with "name" and "command" fields
- Check you're holding Option (⌥) key when clicking

### Changes not reflected
- Config is read on each use, so changes are immediate
- Make sure you saved the file
- Verify the path in Extension Options is correct

---

## 🎯 Pro Tips

1. **Use Version Control**: Keep your config in Git
   ```bash
   cd ~/Projects/my-configs
   git add jsontailor-config.json
   git commit -m "Update API configs"
   ```

2. **Test Commands First**: Always test in Terminal before adding to config
   ```bash
   curl -X GET 'https://api.example.com/test'
   ```

3. **Organize by Environment**: Group configs by dev/staging/prod
   ```json
   [
     {"name": "Dev - Get User", "command": "...dev-api..."},
     {"name": "Prod - Get User", "command": "...api..."}
   ]
   ```

4. **Use Descriptive Names**: "Dev - Get User Info" > "API1"

5. **Cloud Sync for Teams**: Share config via iCloud/Dropbox

---

## 📚 Learn More

See `README.md` for:
- Complete configuration examples
- Advanced usage tips
- Detailed troubleshooting
- cURL command recipes

---

## 🆘 Quick Help

**Where to put config file?**
- Local: `~/Documents/jsontailor-config.json`
- iCloud: `~/Library/Mobile Documents/com~apple~CloudDocs/jsontailor-config.json`
- Dropbox: `~/Dropbox/jsontailor-config.json`

**How to edit config?**
```bash
code ~/Documents/jsontailor-config.json
```

**How to test a cURL command?**
```bash
# Replace *** with actual data
curl -X GET 'https://jsonplaceholder.typicode.com/users/1'
```

**Config not working?**
```bash
# Validate JSON
cat ~/Documents/jsontailor-config.json | python3 -m json.tool
```

---

Happy API testing! 🚀
