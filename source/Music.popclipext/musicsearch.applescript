(* This works on Music 1.6.4 in macOS 26 Tahoe. Will probably break when Apple changes something again. *)

-- search field is in toolbar on Tahoe
on searchFieldInToolbar(theWindow)
	tell application "System Events"
		try
			set searchField to text field 1 of group 1 of toolbar 1 of theWindow
			if subrole of searchField is "AXSearchField" then return searchField
		end try
	end tell
	return missing value
end searchFieldInToolbar

-- select Search item in sidebar on Tahoe
on selectSearchView(theWindow)
	tell application "System Events"
		try
			set sidebarOutline to outline 1 of scroll area 1 of splitter group 1 of theWindow
			repeat with sidebarRow in rows of sidebarOutline
				try
					if name of UI element 1 of sidebarRow is "Search" then
						set selected of sidebarRow to true
						return true
					end if
				end try
			end repeat
		end try
	end tell
	return false
end selectSearchView

-- search field is in sidebar on Catalina, Big Sur, etc.
on searchFieldInSidebar(theWindow)
	tell application "System Events"
		try
			set splitterGroup to splitter group 1 of theWindow
			if (count of scroll areas of splitterGroup) is greater than 0 and (count of outlines of scroll area 1 of splitterGroup) is greater than 0 then
				set containerElement to outline 1 of scroll area 1 of splitterGroup -- catalina
			else
				set containerElement to outline 1 of splitterGroup -- big sur
			end if
			set searchField to text field 1 of UI element 1 of row 1 of containerElement
			if subrole of searchField is "AXSearchField" then return searchField
		end try
	end tell
	return missing value
end searchFieldInSidebar

-- activate Music app
tell application "Music"
	reveal (some playlist whose special kind is Music)
	activate
end tell

-- poke it
tell application "System Events"
	tell process "Music"
		repeat 100 times
			if frontmost is true and number of windows is greater than 0 then
				set musicWindow to first window whose subrole is "AXStandardWindow"
				set searchField to my searchFieldInToolbar(musicWindow)
				if searchField is missing value then
					my selectSearchView(musicWindow)
					repeat 100 times
						set searchField to my searchFieldInToolbar(musicWindow)
						if searchField is not missing value then exit repeat
						delay 0.02
					end repeat
				end if
				if searchField is missing value then set searchField to my searchFieldInSidebar(musicWindow)
				if searchField is not missing value then
					tell searchField
						set focused to true
						if not focused then
							keystroke "f" using command down
						end if
						set value to "{popclip text}"
						keystroke return
					end tell
				end if
				exit repeat
			end if
			delay 0.02
		end repeat
	end tell
end tell
