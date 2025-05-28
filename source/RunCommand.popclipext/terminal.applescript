tell application "Terminal"
    activate
    -- If there are no open windows, open one.
    if (count of windows) is less than 1 then
        do script ""
    end if
    set theTab to selected tab in first window
    
    -- Prepare the command with optional prepend/append text
    set prepend_text to "{popclip option prepend}"
    set append_text to "{popclip option append}"
    
    if prepend_text is not "" and append_text is not "" then
        do script prepend_text & " {popclip text} " & append_text in theTab
    else if prepend_text is not "" then
        do script prepend_text & " {popclip text}" in theTab
    else if append_text is not "" then
        do script "{popclip text} " & append_text in theTab
    else
        do script "{popclip text}" in theTab
    end if
end tell
