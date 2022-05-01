tell application "Simplenote" to activate
tell application "System Events"
	set the clipboard to "{popclip text}"
	set frontmost of process "Simplenote" to true
	delay 0.7
	keystroke "n" using {command down}
	keystroke "v" using {command down}
end tell
