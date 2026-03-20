-- AppleScript for kitty integration with PopClip
-- This script takes the selected text from PopClip and sends it to kitty
-- It uses the application ID to ensure proper identification of kitty
-- Adapted from Licardo: https://github.com/L1cardo
-- Created by herbhuang: https://github.com/herbhuang

-- Configuration Properties
-- Set this property to true to always open in a new window
property open_in_new_window : false

-- Set this property to false to reuse the current tab
property open_in_new_tab : false

-- ========== Handler Definitions ==========

-- Creates a new kitty window using keyboard shortcut Cmd+N
on new_window()
	tell application "System Events"
		tell process "kitty"
			keystroke "n" using command down
		end tell
	end tell
end new_window

-- Creates a new tab in the current kitty window using keyboard shortcut Cmd+T
on new_tab()
	tell application "System Events"
		tell process "kitty"
			keystroke "t" using command down
		end tell
	end tell
end new_tab

-- Creates a new window in the current kitty window using keyboard shortcut Cmd+Enter
on new_panel()
	tell application "System Events"
		tell process "kitty"
			key code 36 using command down
		end tell
	end tell
end new_panel


-- Activates kitty and brings it to the foreground
-- This ensures commands are sent to the correct application
on call_forward()
	tell application id "net.kovidgoyal.kitty"
		-- Launch kitty if not running or bring to front if it is
		activate
		
		-- Ensure kitty is the frontmost application using System Events
		tell application "System Events"
			tell process "kitty"
				if (count of windows) is 0 then
					-- If kitty has no window then tell it to reopen
					tell application id "net.kovidgoyal.kitty" to reopen
				end if

				set frontmost to true
			end tell
		end tell
	end tell
end call_forward

-- Sends text to kitty and executes it by pressing Return (key code 36)
-- The delays help ensure the terminal is ready for input
on send_text(custom_text)
	tell application "System Events"
		tell process "kitty"
			-- Small delay to ensure kitty is ready
			delay 0.1

			-- Get the previous value of the clipboard
			set previousClipboard to the clipboard
			-- Set the custom text to the clipboard
			set the clipboard to custom_text

			delay 0.05
			
			-- Paste the text into kitty
			keystroke "v" using {command down}
			
			-- Small delay before pressing Return
			delay 0.05
			
			-- Press Return to execute the command
			-- Key code 36 is the Return key
			key code 36

			-- Set the clipboard to previous value
			if previousClipboard is not missing value then
                set the clipboard to previousClipboard
            end if
		end tell
	end tell
end send_text

-- ========== Main Program ==========

-- First activate kitty and bring it to the foreground
call_forward()

-- Get the "Use New Tab" option from PopClip
set use_new_tab to "{popclip option newtab}" is "1"

-- Get the "Use New kitty Windows" option from PopClip
set use_new_panel to "{popclip option newpanel}" is "1"

-- Determine where to send the command based on configuration
if open_in_new_window then
	-- Create a new window if configured to do so
	new_window()
else if use_new_tab then
	-- Create a new tab if requested via PopClip option
	new_tab()
else if use_new_panel then
	-- Create a new kitty window if requested via PopClip option
	new_panektl()
else
	-- Otherwise reuse the current tab (no action needed)
end if

-- Ensure kitty is still in focus after potential window/tab changes
call_forward()

-- Retrieve optional prefix and suffix text from PopClip extension settings
-- These allow customizing the command with text before or after the selection
set prepend_text to "{popclip option prepend}"
set append_text to "{popclip option append}"

-- Handle different combinations of prepend/append text
-- and construct the final command to execute
if prepend_text is not "" and append_text is not "" then
	-- Both prepend and append text are provided
	send_text(prepend_text & " {popclip text} " & append_text)
else if prepend_text is not "" then
	-- Only prepend text is provided
	send_text(prepend_text & " {popclip text}")
else if append_text is not "" then
	-- Only append text is provided
	send_text("{popclip text} " & append_text)
else
	-- No prepend or append text, just run the selected text as a command
	send_text("{popclip text}")
end if