tell application "DEVONthink Pro"
	
	if "{popclip text}" = "" then
		beep
		return
	end if
	
	-- edit by Nick Moore
	-- previous usage of (words of theText) was triggering an applescript bug when faced with japanese text input. The script would hang. I have changed it from 10 words to 70 characters, to avoid the bug.
	set theText to "{popclip text}"
	set theTitle to theText
	if (length of theText) > 70 then
		set theTitle to (characters 1 through 70 of theText as string)
		set oldDelimiters to AppleScript's text item delimiters
		set AppleScript's text item delimiters to " "
		set theTitle to (theTitle & "...") as string
		set AppleScript's text item delimiters to oldDelimiters
	end if
	
	set theURL to ""
	if length of "{popclip browser url}" > 0 then
		set theURL to "{popclip browser url}"
	end if
	if length of "{popclip browser title}" > 0 then
		set theTitle to "{popclip browser title}"
	end if
	
	activate
	
	create record with {name:theTitle, type:txt, plain text:theText, URL:theURL}
	
end tell