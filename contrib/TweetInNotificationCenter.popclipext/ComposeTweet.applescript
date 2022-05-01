tell application "System Events"
	tell process "Notification Center"
		-- activate notification center
		click menu bar item 1 of menu bar 1
		-- click the tweet button
		click button 1 of UI element 1 of row 2 of table 1 of scroll area 1 of window "Window"
		-- select all (in case there is existing text)
		keystroke "a" using {command down}
		-- fill in the text
		keystroke "{popclip text}"
	end tell
end tell