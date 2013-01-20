tell application "Reminders"
	activate
	set theAccount to name of first account
	tell account theAccount
		set theList to name of first list
		set myReminder to (make new reminder at list theList with properties {name:"{popclip text}"})
	end tell
end tell