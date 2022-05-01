tell application "Mail"
	activate
	make new outgoing message with properties {visible:true, content:"{popclip text}"}
end tell
