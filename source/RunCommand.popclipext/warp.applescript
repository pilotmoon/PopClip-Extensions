-- For the latest version:
-- https://gist.github.com/parterburn/e832b9090ee35eb830529de8bd978b82

-- Set this property to true to always open in a new window
property open_in_new_window : false

-- Set this property to false to reuse the current tab
property open_in_new_tab : false

-- Handlers
on new_window()
	tell application "System Events"
		tell process "Warp"
			keystroke "n" using command down
		end tell
	end tell
end new_window

on new_tab()
	tell application "System Events"
		tell process "Warp"
			keystroke "t" using command down
		end tell
	end tell
end new_tab

on call_forward()
	tell application "Warp"
		activate
		tell application "System Events"
			tell process "Warp"
				set frontmost to true
			end tell
		end tell
	end tell
end call_forward

on send_text(custom_text)
	tell application "System Events"
		tell process "Warp"
			delay 0.5
			keystroke custom_text
			delay 0.5
			key code 36
		end tell
	end tell
end send_text

-- Main

call_forward()

if open_in_new_window then
	new_window()
else if open_in_new_tab then
	new_tab()
else
	-- Reuse the current tab
end if

call_forward()
send_text("{popclip text}")