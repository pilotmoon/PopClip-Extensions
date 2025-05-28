-- new version of script for iTerm2 v2.9+
tell application id "com.googlecode.iterm2"
	activate
	set _session to current session of current window
	
	-- Prepare the command with optional prepend/append text
	set prepend_text to "{popclip option prepend}"
	set append_text to "{popclip option append}"
	
	tell _session
		if prepend_text is not "" and append_text is not "" then
			write text prepend_text & " {popclip text} " & append_text
		else if prepend_text is not "" then
			write text prepend_text & " {popclip text}"
		else if append_text is not "" then
			write text "{popclip text} " & append_text
		else
			write text "{popclip text}"
		end if
	end tell
end tell
