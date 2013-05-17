tell application "DEVONthink Pro"
	
	if "{popclip text}" = "" then
		beep
		return
	end if
	
	set theText to "{popclip text}"
	set theTitle to theText
	if (count of words of theText) > 10 then
		set theTitle to (words 1 through 10 of theText)
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