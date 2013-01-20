on sortList(unsortedList)
	set oldDelimiters to AppleScript's text item delimiters
	set AppleScript's text item delimiters to (ASCII character 10)
	set sortedList to paragraphs of (do shell script "echo " & quoted form of (unsortedList as string) & "| sort  -d -f")
	set AppleScript's text item delimiters to oldDelimiters
	return sortedList
end sortList

-- sort the list
tell application "Reminders"
	activate
	get the name of every account
	set theAccount to name of first account
	tell account theAccount
		set allLists to the name of every list
	end tell
end tell
set sortedList to sortList(allLists)
set theList to first item of sortedList

tell application "Reminders"
	tell account theAccount to set myReminder to (make new reminder at list theList with properties {name:"{popclip text}"})
end tell