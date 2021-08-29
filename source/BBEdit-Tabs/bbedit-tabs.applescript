tell application "BBEdit"
	activate
	make new text document with properties {contents:"{popclip text}"}
end tell
