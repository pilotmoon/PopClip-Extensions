tell application "Evernote"
	activate
	set theNote to create note with text "{popclip text}"
	if length of "{popclip browser url}" > 0 then
		set source URL of theNote to "{popclip browser url}"
	end if
	open note window with theNote
end tell