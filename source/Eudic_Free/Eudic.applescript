if ApplicationIsRunning("com.eusoft.freeeudic") is false then
	tell application "Finder" to open application file id "com.eusoft.freeeudic"
	delay 1
end if

tell application "System Events"
	key code 19 using {shift down, command down}
	--keystroke "f" using {command down, option down}
end tell

on ApplicationIsRunning(appName)
	tell application "System Events" to set appNameIsRunning to exists (processes where bundle identifier is appName)
	return appNameIsRunning
end ApplicationIsRunning
