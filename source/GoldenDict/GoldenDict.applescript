if application id "org.goldendict" is not running then
	tell application id "org.goldendict" to activate
end if
if application id "org.goldendict" is running then
	tell application "Finder"
		POSIX path of (application file id "org.goldendict" as alias)
	end tell
	set appPath to result
	do shell script (appPath & "/Contents/MacOS/GoldenDict '{popclip text}'")
end if