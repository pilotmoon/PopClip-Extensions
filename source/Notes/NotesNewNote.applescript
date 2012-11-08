tell application "Notes"
	activate
	set theAccount to name of first account
	tell account theAccount
		set theFolder to name of first folder
		set myNote to (make new note at folder theFolder with properties {body:"{popclip text}"})
	end tell
end tell