set inputText to "{popclip text}"
set aat to 0 as boolean
set dot to 0 as boolean
repeat with chr from 1 to (get (count of character in inputText) - 2)
	if item chr of inputText is equal to "@" then set aat to 1 as boolean
	if item chr of inputText is equal to "." then set dot to 1 as boolean
end repeat

if aat and dot then
	tell application "System Events" to open location "mailto:" & inputText
else
	tell application "System Events" to open location "mailto:?body=" & inputText
end if