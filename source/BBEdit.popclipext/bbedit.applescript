tell application "BBEdit"
	activate
	make new text window with properties {contents:"{popclip text}"}
end tell