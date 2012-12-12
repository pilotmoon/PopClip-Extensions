tell application "System Events"
	tell process "SystemUIServer"
		try
			--			repeat with menuBarNum from (count of menu bars) to 0 by -1
			--				repeat with theItem in (menu bar items of (item menuBarNum of menu bars))
			set theItem to menu bar item 1 of menu bar 2
			if (description of theItem) contains "spotlight" then
				-- we found it
				if (selected of theItem) is false then
					click theItem
				end if
				keystroke "{popclip text}"
				error
			end if
			--				end repeat
			--			end repeat
		on error theError
		end try
	end tell
end tell