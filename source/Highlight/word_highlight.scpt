--by Mattia Salamanca Orrego
tell application "Microsoft Word"
	set hiTxt to text object of selection
	tell hiTxt
		set highlight color index to yellow
	end tell
end tell
