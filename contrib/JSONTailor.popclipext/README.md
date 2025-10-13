# JSON Tailor PopClip Extension

A PopClip extension that provides two ways to handle text data with JSON Tailor.

## Features

### Primary Function
- **JSON Tailor**: Load selected text directly into JSON Tailor website for editing and formatting

### Alternative Function (Option ⌥ key)
- **cURL → JSON Tailor**: Send text using custom cURL command, then open the response in JSON Tailor

## Usage

1. **Default Mode**: Select text, click the extension button in PopClip
   - **Direct Jump**: Opens JSON Tailor in browser with selected text loaded

2. **cURL Mode**: Select text, **hold Option (⌥) key** and click the extension button
   - **Execute cURL First**: Sends selected text using configured cURL command template
   - **Then Jump**: After receiving response, automatically opens response data in JSON Tailor
   - **Status Notifications**: Shows loading state and success/failure notifications

## ⚙️ Configuration

To access configuration options:
   - Right-click the extension icon in PopClip
   - Select "Extension Options..."

### Browser Selection
   - **Browser**: Choose which browser to open JSON Tailor in
   - Available options: Safari (default), Google Chrome, Microsoft Edge, Firefox, Arc, Brave Browser, Opera
   - This setting applies to both direct and cURL modes

### cURL Command Template (Option key alternative action only)
   - Enter your complete cURL command in "cURL Command Template" field
   - Use `***` as placeholder for selected text
   - **Note**: This configuration only affects Option key behavior
   - **Required**: Must be configured to use Option key functionality

## 💡 cURL Command Examples

- **Basic POST**: `curl -X POST -H "Content-Type: application/json" -d '***' https://api.example.com/data`
- **With Auth**: `curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_TOKEN" -d '***' https://api.example.com/data`
- **PUT Request**: `curl -X PUT -H "Content-Type: application/json" -d '***' https://api.example.com/users/123`
- **Custom Headers**: `curl -X POST -H "Content-Type: application/json" -H "X-API-Key: YOUR_KEY" -d '***' https://api.example.com/webhook`
- **Get User Data**: `curl -X GET 'https://jsonplaceholder.typicode.com/users/***' -H 'Accept: application/json'`

## Customization

You can modify the script to:
- Change default cURL endpoints
- Add custom HTTP headers
- Adjust cURL parameters

## Author

Yimin Wang - [GitHub](https://github.com/Wangggym)