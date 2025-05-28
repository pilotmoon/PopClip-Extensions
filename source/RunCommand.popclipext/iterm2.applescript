-- AppleScript for iTerm2 (v2.9+) integration with PopClip
-- This script takes the selected text from PopClip and sends it to iTerm2
-- It uses the application ID to ensure proper identification of iTerm2

tell application id "com.googlecode.iterm2"
	-- Bring iTerm2 to the foreground
	activate
	
	-- Get a reference to the current terminal session
	-- This targets the active session in the frontmost window
	set _session to current session of current window
	
	-- Retrieve optional prefix and suffix text from PopClip extension settings
	-- These allow customizing the command with text before or after the selection
	set prepend_text to "{popclip option prepend}"
	set append_text to "{popclip option append}"
	
	-- Target the current session to send our commands
	tell _session
		-- Handle different combinations of prepend/append text
		-- and construct the final command to execute
		if prepend_text is not "" and append_text is not "" then
			-- Both prepend and append text are provided
			write text prepend_text & " {popclip text} " & append_text
		else if prepend_text is not "" then
			-- Only prepend text is provided
			write text prepend_text & " {popclip text}"
		else if append_text is not "" then
			-- Only append text is provided
			write text "{popclip text} " & append_text
		else
			-- No prepend or append text, just run the selected text as a command
			write text "{popclip text}"
		end if
	end tell
end tell
