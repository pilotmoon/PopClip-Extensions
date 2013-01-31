tell application "Reminders"
	activate
	-- default list
	set listName to name of first list in first account
	
	-- look for specific list name
	set allAccounts to name of every account
	repeat with accountName in allAccounts
		tell account accountName
			set allLists to name of every list
			if allLists contains "{popclip option listname}" then
				set listName to "{popclip option listname}"
			end if
		end tell
	end repeat
	
	-- make the reminder
	tell account accountName to set myReminder to (make new reminder at list listName with properties {name:"{popclip text}"})
	
end tell