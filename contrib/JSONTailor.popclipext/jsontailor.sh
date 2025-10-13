#!/bin/bash

# Get the selected text
selected_text="$POPCLIP_TEXT"

# Get browser preference from options
browser="$POPCLIP_OPTION_BROWSER"

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

# Check if Option key is pressed
if [ "$POPCLIP_MODIFIER_FLAGS" = "524288" ]; then
    # Option key is pressed - execute cURL mode
    
    # Show loading notification
    osascript -e 'display notification "Sending cURL request..." with title "JSON Tailor" subtitle "Please wait"'
    
    # Get curl command template from PopClip option or use default
    curl_template="$POPCLIP_OPTION_CURL_COMMAND"
    
    # Check if curl command template is configured
    if [ -z "$curl_template" ]; then
        osascript -e 'display notification "No cURL command configured. Please set it in Extension Options." with title "JSON Tailor" subtitle "Configuration needed"'
        exit 1
    fi
    
    # Replace *** placeholder with the actual selected text
    # Escape single quotes in selected text to prevent command injection
    escaped_text=$(echo "$selected_text" | sed "s/'/'\"'\"'/g")
    curl_command=$(echo "$curl_template" | sed "s/\*\*\*/'$escaped_text'/g")
    
    # Execute the curl command and capture response
    response=$(eval "$curl_command -s")
    exit_code=$?
    
    # Check if response is valid
    if [ $exit_code -eq 0 ] && [ -n "$response" ]; then
        # URL encode the response for JSON Tailor
        encoded_response=$(python3 -c "import urllib.parse; import sys; print(urllib.parse.quote(sys.argv[1]))" "$response" 2>/dev/null)
        
        if [ $? -eq 0 ] && [ -n "$encoded_response" ]; then
            # Open JSON Tailor with the response
            open_in_browser "https://jsontailor.top/#input=$encoded_response"
            
            # Show success notification
            osascript -e 'display notification "Response received and opened in JSON Tailor" with title "JSON Tailor cURL" subtitle "Success!"'
        else
            # Show error for encoding issues
            osascript -e 'display notification "Failed to encode response data" with title "JSON Tailor cURL Error" subtitle "Encoding failed"'
        fi
    else
        # Show detailed error notification
        if [ -z "$response" ]; then
            error_msg="No response received"
        else
            error_msg="cURL command failed (exit code: $exit_code)"
        fi
        
        osascript -e 'display notification "'"$error_msg"'" with title "JSON Tailor cURL Error" subtitle "Check your configuration"'
    fi
    
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