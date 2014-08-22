set term to "{popclip option term}"

if term = "iTerm2" then
    tell application "iTerm"
        activate
        set _session to current session of current terminal
        tell _session
            set command to get the clipboard
            write text "{popclip text}"
        end tell
    end tell
else
    tell application "Terminal"
        activate
        -- If there are no open windows, open one.
        if (count of windows) is less than 1 then
            do script ""
        end if
        set theTab to selected tab in first window
        do script "{popclip text}" in theTab
    end tell
end if
