set currentApplication to current application

tell application "OmniFocus"
	activate
	tell quick entry
		open
		set _task to make new inbox task with properties {name:first paragraph of "{popclip text}"}
		tell the note of _task
			if "{popclip text}" contains "http://" or "{popclip text}" contains "https://" then
				insert "{popclip text}" & return & return at before first character
			end if
			
			if length of "{popclip browser url}" > 0 then
				set theSource to "From web page: {popclip browser url}"
			else
				set theSource to "From application: {popclip app name}"
			end if
			insert (theSource & " on " & (current date) as string) & return & return & "{popclip text}" at before first character
			
		end tell
	end tell
	tell application "System Events"
		keystroke (ASCII character 31)
		keystroke "'" using command down
	end tell
end tell

(*
on run {aSelectedText, parameters}
    
    tell application "OmniFocus"
        activate
        tell quick entry
            open
            set _task to make new inbox task with properties {name:aSelectedText}
            (*
            tell the note of _task
                insert "Original Message" & return & return & aSelectedText at before first character
                set value of attribute "link" of style of paragraph 1 to "aMsgUrl"
                insert "From: " & "aSender" & "  " at before first character
            end tell
            *)
            select {_task}
            tell application "System Events"
                keystroke "'" using command down
            end tell
        end tell
    end tell
    
    return aSelectedText
end run
*)
