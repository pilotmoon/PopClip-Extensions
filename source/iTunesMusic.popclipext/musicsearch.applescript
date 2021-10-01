-- activate itunes and bring music section to the front
tell application "iTunes"
	activate
	windows
	reveal (some playlist whose special kind is Music)
end tell

-- poke it into submission
tell application "System Events"
	tell process "iTunes"
		-- wait for application to be frontmost
		repeat 100 times
			if frontmost is true then
				
				-- find the search field
				set searchField to missing value
				repeat with aWindow in windows
					repeat with aField in (every text field of aWindow)
						if subrole of aField is "AXSearchField" then
							set searchField to aField
						end if
					end repeat
				end repeat
				
				if searchField is not equal to missing value then
					
					-- to set the focus to search field
					if focused of searchField is false then
						set focused of searchField to true
						delay 0.5
					end if
					
					-- wait for search field to actually have focus
					repeat 100 times
						if focused of searchField is true then
							-- paste our text into field using clipboard
							set the clipboard to "{popclip text}"
							keystroke "v" using {command down}
							keystroke return
							exit repeat
						end if
						delay 0.02
					end repeat
				end if
				exit repeat
			end if
			delay 0.02
		end repeat
	end tell
end tell
