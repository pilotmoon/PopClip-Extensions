(* This works on Music 1.0.6.10 in Catalina. Will probably break when Apple changes something. Then, I'll get emails. Such is life. *)

-- activate Music app
tell application "Music"
	reveal (some playlist whose special kind is Music)
	activate
end tell

-- poke it
tell application "System Events"
	tell process "Music"
		-- wait for application to be frontmost
		repeat 100 times
			if frontmost is true then
				set musicWindow to first window whose subrole is "AXStandardWindow"
				set searchField to text field 1 of UI element 1 of row 1 of outline 1 of scroll area 1 of splitter group 1 of musicWindow
				if subrole of searchField is "AXSearchField" then
					set focused to searchField
					set value of searchField to "{popclip text}"
					keystroke return
				end if
				exit repeat
			end if
			delay 0.02
		end repeat
	end tell
end tell
