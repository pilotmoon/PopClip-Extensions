on run argv
	tell application "textsoapAgent"
		-- Choose a cleaner from the list
		set cleanerTitle to pickCleaner
		-- If the user canceled, do nothing
		if cleanerTitle is false or cleanerTitle is "#CANCEL" then
			error "Cancelled" number 501
		end if
		-- Clean the string
		set cleanedText to cleanText "{popclip text}" with cleanerTitle
		return cleanedText
	end tell
end run