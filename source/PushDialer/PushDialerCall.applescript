on run
	
	set theString to "{popclip text}" as text
	set theString to replace_chars(theString, "(0)", "")
	
	set theAllowedCharacters to {"+", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ",", " ", ";", "(", ")", "-"}
	
	set itemized to every character of theString
	
	set theNewString to ""
	tell application "Finder"
		repeat with i from 1 to number of items of itemized
			if theAllowedCharacters contains (item i of itemized) then
				set theNewString to theNewString & item i of itemized
			end if
		end repeat
	end tell
	open location "pushdialer://" & trim(theNewString)
	return theNewString
	
end run

on replace_chars(this_text, search_string, replacement_string)
	set AppleScript's text item delimiters to the search_string
	set the item_list to every text item of this_text
	set AppleScript's text item delimiters to the replacement_string
	set this_text to the item_list as string
	set AppleScript's text item delimiters to ""
	return this_text
end replace_chars


on trim(someText)
	repeat until someText does not start with " "
		set someText to text 2 thru -1 of someText
	end repeat
	
	repeat until someText does not end with " "
		set someText to text 1 thru -2 of someText
	end repeat
	
	return someText
end trim