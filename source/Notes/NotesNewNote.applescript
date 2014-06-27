tell application "Notes"
	activate
	set theText to "{popclip text}"
	set theAccount to name of first account
	tell account theAccount
		set theFolder to name of first folder
		set myNote to (make new note at folder theFolder with properties {body:theText})
		set name of myNote to first paragraph of theText
	end tell
end tell