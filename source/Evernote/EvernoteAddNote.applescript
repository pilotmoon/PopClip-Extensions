tell application id "com.evernote.Evernote"
	activate
	if length of "{popclip html}" > 0 then
		set theNote to create note with html "{popclip html}"
	else
		set theNote to create note with text "{popclip text}"
	end if
	if length of "{popclip browser url}" > 0 then
		set source URL of theNote to "{popclip browser url}"
	end if
	if length of "{popclip browser title}" > 0 then
		set title of theNote to "{popclip browser title}"
	end if
	open note window with theNote
end tell