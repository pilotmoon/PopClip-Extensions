tell application "Visual Studio Code"
	if not running then
		run
		delay 0.25
	end if
	activate
    open "{popclip text}"
end tell