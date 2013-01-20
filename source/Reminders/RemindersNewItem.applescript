tell application "Reminders"
	activate
	set theAccount to name of first account
	tell account theAccount
		set allLists to name of every list
		if allLists contains "{popclip option listname}" then
			set theList to "{popclip option listname}"
		else
			set theList to first item in allLists
		end if
		set myReminder to (make new reminder at list theList with properties {name:"{popclip text}"})
	end tell
end tell