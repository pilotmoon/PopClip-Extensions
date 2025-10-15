#!/bin/bash

# Get the selected text
selected_text="$POPCLIP_TEXT"

# Get browser preference from options
browser="$POPCLIP_OPTION_BROWSER"

# Get config file path from options
config_file_path="$POPCLIP_OPTION_CONFIG_FILE_PATH"

# Function to open URL in specified browser
open_in_browser() {
    local url="$1"
    
    if [ -z "$browser" ]; then
        # No browser specified, use system default
        open "$url"
    else
        # Use specified browser
        open -a "$browser" "$url"
    fi
}

# Function to execute curl and open result in JSON Tailor
execute_curl_and_open() {
    local curl_command_template="$1"
    local config_name="$2"
    
    # Show loading notification
    osascript -e "display notification \"Sending request for: $config_name...\" with title \"JSON Tailor\" subtitle \"Please wait\""
    
    # Replace *** placeholder with the actual selected text
    # Escape single quotes in selected text to prevent command injection
    escaped_text=$(echo "$selected_text" | sed "s/'/'\"'\"'/g")
    curl_command=$(echo "$curl_command_template" | sed "s/\*\*\*/'$escaped_text'/g")
    
    # Execute the curl command and capture response
    response=$(eval "$curl_command -s" 2>&1)
    exit_code=$?
    
    # Check if response is valid
    if [ $exit_code -eq 0 ] && [ -n "$response" ]; then
        # URL encode the response for JSON Tailor
        encoded_response=$(python3 -c "import urllib.parse; import sys; print(urllib.parse.quote(sys.argv[1]))" "$response" 2>/dev/null)
        
        if [ $? -eq 0 ] && [ -n "$encoded_response" ]; then
            # Open JSON Tailor with the response
            open_in_browser "https://jsontailor.top/#input=$encoded_response"
            
            # Show success notification
            osascript -e "display notification \"Response received and opened in JSON Tailor\" with title \"$config_name\" subtitle \"Success!\""
        else
            # Show error for encoding issues
            osascript -e "display notification \"Failed to encode response data\" with title \"JSON Tailor Error\" subtitle \"$config_name\""
        fi
    else
        # Show detailed error notification
        if [ -z "$response" ]; then
            error_msg="No response received"
        else
            error_msg="Request failed (exit code: $exit_code)"
        fi
        
        osascript -e "display notification \"$error_msg\" with title \"JSON Tailor Error\" subtitle \"$config_name\""
    fi
}

# Check if Option key is pressed
if [ "$POPCLIP_MODIFIER_FLAGS" = "524288" ]; then
    # Option key is pressed - show curl configuration selection menu
    
    # Check if config file path is configured
    if [ -z "$config_file_path" ]; then
        osascript -e 'display notification "No configuration file path specified. Please set it in Extension Options." with title "JSON Tailor" subtitle "Configuration needed"'
        exit 1
    fi
    
    # Expand ~ to home directory
    config_file_path="${config_file_path/#\~/$HOME}"
    
    # Check if config file exists
    if [ ! -f "$config_file_path" ]; then
        osascript -e "display notification \"Configuration file not found: $config_file_path\" with title \"JSON Tailor\" subtitle \"File not found\""
        exit 1
    fi
    
    # Read the JSON configuration from file
    curl_configs_json=$(cat "$config_file_path" 2>/dev/null)
    
    if [ -z "$curl_configs_json" ]; then
        osascript -e "display notification \"Failed to read configuration file\" with title \"JSON Tailor\" subtitle \"File error\""
        exit 1
    fi
    
    # Parse JSON and extract configuration names with numbers
    config_data=$(echo "$curl_configs_json" | python3 -c "
import json
import sys
try:
    configs = json.load(sys.stdin)
    # Create both display names (with numbers) and original names
    display_names = []
    original_names = []
    for i, config in enumerate(configs, 1):
        if 'name' in config and 'command' in config:
            display_names.append(f'{i}. {config[\"name\"]}')
            original_names.append(config['name'])
    if display_names:
        print('DISPLAY:' + '|'.join(display_names))
        print('ORIGINAL:' + '|'.join(original_names))
    else:
        print('')
except:
    print('')
" 2>/dev/null)
    
    if [ -z "$config_data" ]; then
        osascript -e 'display notification "Invalid JSON format in configuration file" with title "JSON Tailor" subtitle "Configuration error"'
        exit 1
    fi
    
    # Extract display and original names
    display_names=$(echo "$config_data" | grep "^DISPLAY:" | sed 's/^DISPLAY://')
    original_names=$(echo "$config_data" | grep "^ORIGINAL:" | sed 's/^ORIGINAL://')
    
    if [ -z "$display_names" ]; then
        osascript -e 'display notification "No valid cURL configurations found in file" with title "JSON Tailor" subtitle "Configuration error"'
        exit 1
    fi
    
    # Convert pipe-separated names to comma-separated for AppleScript
    config_names_list=$(echo "$display_names" | sed 's/|/", "/g')
    
    # Show selection dialog with improved formatting
    selected_display=$(osascript <<EOF
tell application "System Events"
    activate
    set configList to {"$config_names_list"}
    set selectedConfig to choose from list configList ¬
        with prompt "选择一个 cURL 配置：" ¬
        with title "JSON Tailor - cURL 配置" ¬
        default items {item 1 of configList} ¬
        OK button name "执行" ¬
        cancel button name "取消"
    if selectedConfig is false then
        return ""
    else
        return item 1 of selectedConfig
    end if
end tell
EOF
)
    
    # Check if user cancelled the dialog
    if [ -z "$selected_display" ]; then
        exit 0
    fi
    
    # Extract the original name from the display name (remove number prefix)
    selected_name=$(echo "$selected_display" | sed 's/^[0-9]*\. //')
    
    # Get the curl command for the selected configuration
    curl_command=$(echo "$curl_configs_json" | python3 -c "
import json
import sys
try:
    configs = json.load(sys.stdin)
    selected = '$selected_name'
    for config in configs:
        if config.get('name') == selected:
            print(config.get('command', ''))
            break
except:
    print('')
" 2>/dev/null)
    
    if [ -z "$curl_command" ]; then
        osascript -e 'display notification "Failed to retrieve cURL command" with title "JSON Tailor Error" subtitle "Configuration error"'
        exit 1
    fi
    
    # Execute the selected curl command
    execute_curl_and_open "$curl_command" "$selected_name"
    
else
    # No modifier key - direct URL mode
    
    # URL encode the selected text for JSON Tailor
    encoded_text=$(python3 -c "import urllib.parse; import sys; print(urllib.parse.quote(sys.argv[1]))" "$selected_text" 2>/dev/null)
    
    if [ $? -eq 0 ] && [ -n "$encoded_text" ]; then
        # Open JSON Tailor directly with the selected text
        open_in_browser "https://jsontailor.top/#input=$encoded_text"
    else
        # Fallback: open JSON Tailor without encoding
        open_in_browser "https://jsontailor.top/#input=$selected_text"
    fi
fi
