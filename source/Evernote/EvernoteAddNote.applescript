tell application "Evernote"
	activate
	set theNote to create note with text "{popclip text}"
	open note window with theNote
end tell