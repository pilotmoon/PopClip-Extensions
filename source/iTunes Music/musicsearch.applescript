-- activate itunes and bring music section to the front
tell application "iTunes"
	activate
	reveal (some playlist whose special kind is Music)
end tell

-- poke it into submission
tell application "System Events"
	tell process "iTunes"
		-- wait for application to be frontmost
		repeat 100 times
			if frontmost is true then
				-- find the search field
				set theWindow to (some window whose name is "iTunes")
				set searchField to (some text field of theWindow whose subrole is "AXSearchField")
				
				-- to set the focus to search field
				keystroke "f" using {command down}
				
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
				exit repeat
			end if
			delay 0.02
		end repeat
	end tell
end tell
