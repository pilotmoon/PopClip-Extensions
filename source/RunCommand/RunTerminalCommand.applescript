set term to "{popclip option term}"

if term = "iTerm2" then
    tell application "iTerm"
        set _session to current session of current terminal
        tell _session
            set command to get the clipboard
            write text "{popclip text}"
        end tell
    end tell
else
    tell application "Terminal"
        set theTab to selected tab in first window
        do script "{popclip text}" in theTab
    end tell
end if
