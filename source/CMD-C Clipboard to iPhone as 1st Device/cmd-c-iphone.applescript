on run
	
	set theString to "{popclip urlencoded text}" as text
	
	tell application "System Events"
		set theURL to "command-c://x-callback-url/copyText?deviceIndex=0&text=" & theString
		open location theURL
	end tell
	
end run

