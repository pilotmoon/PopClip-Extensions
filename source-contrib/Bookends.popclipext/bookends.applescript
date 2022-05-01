tell application "Bookends"
	if "{popclip modifier flags}" is "1048576" then
		
		tell front library window
			if id of group items contains "{popclip text}" then delete group item "{popclip text}"
			set myPubs to sql search "allFields REGEX '(?i){popclip text}'"
			make new group item with properties {name:"{popclip text}"}
			add myPubs to group item "{popclip text}"
		end tell
		
		activate
		
	else
		
		set pubList to quick add {"{popclip text}"}
		
	end if
end tell