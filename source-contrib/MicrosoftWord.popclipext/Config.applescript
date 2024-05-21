-- #popclip
-- name: Microsoft Word
-- identifier: com.pilotmoon.popclip.extension.msword
-- description: Add the text at the end of the active Microsoft Word document.
-- keywords: msword append
-- popclipVersion: 4151
-- icon: iconify:fa6-solid:file-word
-- language: applescript

tell application "Microsoft Word"
	-- activate
	if not (exists of active document) then
		create new document
		set theSeparator to ""
	else
	  set theSeparator to return
	end if

	if length of "{popclip browser url}" > 0 then
		set theSource to return & "-- From: {popclip browser url}"
	else
		set theSource to ""
	end if

	insert text theSeparator & "{popclip text}" & theSource at end of text object of active document
end tell
