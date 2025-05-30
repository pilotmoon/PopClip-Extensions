-- AppleScript for macOS Terminal app integration with PopClip
-- This script takes the selected text from PopClip and runs it as a command in Terminal

tell application "Terminal"
    -- Bring Terminal to the foreground
    activate
    
    -- Get the "Use New Tab" option
    set use_new_tab to "{popclip option newtab}" is "1"
    
    -- If there are no open windows, open one.
    if (count of windows) is less than 1 then
        do script ""
        set use_new_tab to false -- No need for new tab if we just opened a window
    end if
    
    -- Create a new tab if requested
    if use_new_tab then
        tell application "System Events"
            tell process "Terminal"
                keystroke "t" using command down
            end tell
        end tell
        delay 0.5 -- Give the new tab time to initialize
    end if
    
    -- Get a reference to the currently active tab in the first window
    set theTab to selected tab in first window
    
    -- Retrieve optional prefix and suffix text from PopClip extension settings
    -- These allow customizing the command with text before or after the selection
    set prepend_text to "{popclip option prepend}"
    set append_text to "{popclip option append}"
    
    -- Handle different combinations of prepend/append text
    -- and construct the final command to execute
    if prepend_text is not "" and append_text is not "" then
        -- Both prepend and append text are provided
        do script prepend_text & " {popclip text} " & append_text in theTab
    else if prepend_text is not "" then
        -- Only prepend text is provided
        do script prepend_text & " {popclip text}" in theTab
    else if append_text is not "" then
        -- Only append text is provided
        do script "{popclip text} " & append_text in theTab
    else
        -- No prepend or append text, just run the selected text as a command
        do script "{popclip text}" in theTab
    end if
end tell
