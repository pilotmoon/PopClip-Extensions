tell application id "com.googlecode.iterm2"
	activate
	set _session to current session of current terminal
	tell _session
		set command to get the clipboard
		write text "{popclip text}"
	end tell
end tell