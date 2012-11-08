tell application "Sparrow"
	set newMessage to make new outgoing message with properties {content:"{popclip text}"}
	compose newMessage
	activate
end tell
