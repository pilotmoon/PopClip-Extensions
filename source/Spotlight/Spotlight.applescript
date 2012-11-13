tell application "System Events"
	keystroke space using {command down}
	delay 0.1
	keystroke the text of "{popclip text}"
end tell