set thePath to POSIX file "{popclip text}"
tell application "Finder"
	reveal thePath
	activate
end tell