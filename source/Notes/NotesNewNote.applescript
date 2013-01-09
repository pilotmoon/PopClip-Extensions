tell application "Notes"
	activate
	set theAccount to name of first account
	tell account theAccount
		set theFolder to name of first folder
		if length of "{popclip html}" > 0 then
			set myNote to (make new note at folder theFolder with properties {body:"{popclip html}"})
		else
			set myNote to (make new note at folder theFolder with properties {body:"{popclip text}"})
		end if
	end tell
end tell