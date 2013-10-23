tell application "Reminders"
	
	activate
	
	make new reminder at list "{popclip option listname}" with properties {name:"{popclip text}"}
	
end tell