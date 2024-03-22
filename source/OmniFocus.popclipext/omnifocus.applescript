if length of "{popclip browser url}" > 0 then
	set theSource to "From web page: {popclip browser url}"
else
	set theSource to "From application: {popclip app name}"
end if
set theNote to theSource & " on " & ((current date) as string) & return & return & "{popclip text}"
tell application id "com.omnigroup.OmniFocus4"
	tell default document
		make new inbox task with properties {name:first paragraph of "{popclip text}", note:theNote}
	end tell
end tell