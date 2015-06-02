tell application "iTerm"
    activate
    set _session to current session of current terminal
    tell _session
        set command to get the clipboard
        write text "{popclip text}"
    end tell
end tell
