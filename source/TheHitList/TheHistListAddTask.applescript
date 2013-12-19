tell application "The Hit List"
	set theProperties to { title: "{popclip text}" }

	if length of "{popclip browser url}" > 0 then
		set theProperties to theProperties & { notes : "From: " & "{popclip browser url}" }
	end if

	tell inbox
		 set newTask to make task in beginning of tasks with properties theProperties
	end tell

	set selection to newTask

	activate
end tell
