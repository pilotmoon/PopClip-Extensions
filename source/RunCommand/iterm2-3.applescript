-- new version of script for iTerm2 v2.9+
tell application id "com.googlecode.iterm2"
	activate
	create window with default profile
	set _session to current session of current window
	tell _session
		set command to get the clipboard
		write text "{popclip text}"
	end tell
end tell