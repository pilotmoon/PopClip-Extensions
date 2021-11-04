tell application "DEVONthink Pro"
	activate
	delay 0.5
	tell application "System Events"
		keystroke "f" using {command down, shift down}
		delay 0.5
		keystroke "v" using {command down}
	end tell
end tell