#!/bin/bash

# Get the selected text
selected_text="$POPCLIP_TEXT"

# Get options
browser="$POPCLIP_OPTION_BROWSER"
config_file_path="$POPCLIP_OPTION_CONFIG_FILE_PATH"
skip_dialog="$POPCLIP_OPTION_SKIP_DIALOG"

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

# Function to build URL with selected text
build_url() {
    local url_template="$1"
    
    # Use Python to replace {text} with the actual text (no encoding)
    # The browser will handle URL encoding when opening the URL
    export URL_TEMPLATE="$url_template"
    export SELECTED_TEXT="$selected_text"
    
    final_url=$(python3 <<'PYEOF'
import os
import sys

url_template = os.environ.get('URL_TEMPLATE')
selected_text = os.environ.get('SELECTED_TEXT')

# Replace {text} or *** placeholder with the original text (no encoding)
# The browser will handle URL encoding automatically
final_url = url_template.replace('{text}', selected_text).replace('***', selected_text)

print(final_url)
PYEOF
)
    
    echo "$final_url"
}

# Check if config file path is configured
if [ -z "$config_file_path" ]; then
    osascript -e 'display notification "No configuration file path specified. Please set it in Extension Options." with title "Quick Navigate" subtitle "Configuration needed"'
    exit 1
fi

# Expand ~ to home directory
config_file_path="${config_file_path/#\~/$HOME}"

# Check if config file exists
if [ ! -f "$config_file_path" ]; then
    osascript -e "display notification \"Configuration file not found: $config_file_path\" with title \"Quick Navigate\" subtitle \"File not found\""
    exit 1
fi

# Validate JSON format by trying to parse it
if ! python3 -c "import json; json.load(open('$config_file_path'))" >/dev/null 2>&1; then
    osascript -e 'display notification "Invalid JSON format in configuration file" with title "Quick Navigate" subtitle "Configuration error"'
    exit 1
fi

# Check if we should show the selection dialog
# Skip dialog if skip_dialog is true, otherwise always show dialog
if [ "$skip_dialog" != "1" ]; then
    # Show configuration selection menu
    
    # Export config file path for Python script
    export CONFIG_FILE_PATH="$config_file_path"
    
    # Parse JSON and extract configuration names with numbers and descriptions
    config_data=$(python3 <<'PYEOF'
import json
import sys
import os
try:
    config_file = os.environ.get('CONFIG_FILE_PATH')
    with open(config_file, 'r') as f:
        configs = json.load(f)
    # Create both display names (with numbers and descriptions) and original names
    display_names = []
    original_names = []
    for i, config in enumerate(configs, 1):
        if 'name' in config and 'url' in config:
            name = config['name']
            desc = config.get('description', '')
            # Format: "1. Name - Description" or just "1. Name" if no description
            if desc:
                display_names.append(f'{i}. {name} - {desc}')
            else:
                display_names.append(f'{i}. {name}')
            original_names.append(name)
    if display_names:
        print('DISPLAY:' + '|'.join(display_names))
        print('ORIGINAL:' + '|'.join(original_names))
    else:
        print('')
except Exception as e:
    sys.stderr.write(f"Error: {str(e)}\n")
    print('')
PYEOF
)
    
    if [ -z "$config_data" ]; then
        osascript -e 'display notification "Invalid JSON format in configuration file" with title "Quick Navigate" subtitle "Configuration error"'
        exit 1
    fi
    
    # Extract display and original names
    display_names=$(echo "$config_data" | grep "^DISPLAY:" | sed 's/^DISPLAY://')
    original_names=$(echo "$config_data" | grep "^ORIGINAL:" | sed 's/^ORIGINAL://')
    
    if [ -z "$display_names" ]; then
        osascript -e 'display notification "No valid configurations found in file" with title "Quick Navigate" subtitle "Configuration error"'
        exit 1
    fi
    
    # Convert pipe-separated names to comma-separated for AppleScript
    config_names_list=$(echo "$display_names" | sed 's/|/", "/g')
    
    # Show selection dialog
    selected_display=$(osascript <<EOF
tell application "System Events"
    activate
    set configList to {"$config_names_list"}
    set selectedConfig to choose from list configList ¬
        with prompt "选择一个导航目标：" ¬
        with title "Quick Navigate - 选择配置" ¬
        default items {item 1 of configList} ¬
        OK button name "打开" ¬
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
    
    # Extract the original name from the display name (remove number prefix and description)
    # Format is "1. Name - Description", we want just "Name"
    selected_name=$(echo "$selected_display" | sed 's/^[0-9]*\. \(.*\) - .*$/\1/')
    
    # If there's no description (no " - "), just remove the number prefix
    if [ "$selected_name" = "$selected_display" ]; then
        selected_name=$(echo "$selected_display" | sed 's/^[0-9]*\. //')
    fi
    
else
    # Skip dialog mode - use the first configuration
    export CONFIG_FILE_PATH="$config_file_path"
    selected_name=$(python3 <<'PYEOF'
import json
import sys
import os
try:
    config_file = os.environ.get('CONFIG_FILE_PATH')
    with open(config_file, 'r') as f:
        configs = json.load(f)
    if configs and len(configs) > 0 and 'name' in configs[0]:
        print(configs[0]['name'])
except Exception as e:
    sys.stderr.write(f"Error: {str(e)}\n")
    print('')
PYEOF
)
    
    if [ -z "$selected_name" ]; then
        osascript -e 'display notification "No valid configuration found" with title "Quick Navigate" subtitle "Configuration error"'
        exit 1
    fi
fi

# Get the URL template for the selected configuration
export CONFIG_FILE_PATH="$config_file_path"
export SELECTED_NAME="$selected_name"
url_template=$(python3 <<'PYEOF'
import json
import sys
import os
try:
    config_file = os.environ.get('CONFIG_FILE_PATH')
    selected = os.environ.get('SELECTED_NAME')
    with open(config_file, 'r') as f:
        configs = json.load(f)
    for config in configs:
        if config.get('name') == selected:
            print(config.get('url', ''))
            break
except Exception as e:
    sys.stderr.write(f"Error getting URL: {str(e)}\n")
    print('')
PYEOF
)

if [ -z "$url_template" ]; then
    osascript -e 'display notification "Failed to retrieve URL template" with title "Quick Navigate Error" subtitle "Configuration error"'
    exit 1
fi

# Build the final URL and open it
final_url=$(build_url "$url_template")
open_in_browser "$final_url"

# Show success notification
osascript -e "display notification \"Opening: $selected_name\" with title \"Quick Navigate\" subtitle \"Navigating...\""

