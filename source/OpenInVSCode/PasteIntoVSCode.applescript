tell application "Visual Studio Code"
	if not running then
		run
		delay 0.25
	end if
	activate
end tell

tell application "System Events"
	tell process "Code"
		set frontmost to true
		click menu item 1 of menu 3 of menu bar 1
	end tell
	keystroke "v" using command down
end tell