(* This is based on the original iTunesMusic script.
But I had to remove the direct UI scripting since the search field
is not exposed for scripting. -NM *)


-- activate Music app
tell application "Music"
	activate
end tell

-- poke it
tell application "System Events"
	tell process "Music"
		-- wait for application to be frontmost
		repeat 100 times
			if frontmost is true then
				
				(* command-F to focus the search field.
				unfortunately, if the searc field already has the focus, we
				get the boop sound. *)
				keystroke "f" using {command down}
				-- paste our text into field using clipboard
				set the clipboard to "{popclip text}"
				keystroke "v" using {command down}
				keystroke return
				exit repeat
				
			end if
			delay 0.02
		end repeat
	end tell
end tell

