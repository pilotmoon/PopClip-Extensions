tell application id "com.evernote.Evernote"
	activate
	set theHtml to "{popclip html}"	
	set theHtmlLength to (get length of theHtml)
	if theHtmlLength > 0 then		
		-- Evernote 5.6.0 public beta fails if the HTML contains a doctype prefix. So we remove it.
		set doctypePrefix to "<!DOCTYPE html>"
		set doctypePrefixLength to (get length of doctypePrefix)
		set prefix to (get characters 1 thru doctypePrefixLength of theHtml as string)
		if prefix is doctypePrefix then
			set theHtml to (get characters (doctypePrefixLength + 1) thru theHtmlLength of theHtml as string)
		end if
		set theNote to create note with html theHtml
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
	activate
end tell